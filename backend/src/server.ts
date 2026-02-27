import "dotenv/config";
import { constants as fsConstants } from "node:fs";
import { access, mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import authRoutes from "./(auth)/auth.routes";
import { prisma } from "./lib/prisma";
import {
	generateApaCitation,
	generateResearchId,
} from "./lib/research-generation";

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RESEARCH_FILES_DIR = path.join(
	__dirname,
	"research-files",
	"research-files",
);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
	res.send("Research Realm Backend is running");
});

// Auth routes
app.use("/api/auth", authRoutes);

const resolveResearchFilePath = (researchId: string) =>
	path.join(RESEARCH_FILES_DIR, `${researchId}.pdf`);

const doesFileExist = async (filePath: string) => {
	try {
		await access(filePath, fsConstants.F_OK);
		return true;
	} catch {
		return false;
	}
};

app.get("/archives", async (req, res) => {
	const { search, year } = req.query;
	const archives = await prisma.research.findMany({
		select: {
			author: true,
			citation: true,
			id: true,
			publishedAt: true,
			researchId: true,
			title: true,
		},
		where: {
			AND: [
				search
					? {
							OR: [
								{ title: { contains: String(search) } },
								{ author: { contains: String(search) } },
								{ abstract: { contains: String(search) } },
							],
						}
					: {},
				year
					? {
							publishedAt: {
								gte: Number(year),
								lte: Number(year),
							},
						}
					: {},
			],
		},
	});
	res.json(archives);
});

app.get("/archives/:id", async (req, res) => {
	const { id } = req.params;
	const research = await prisma.research.findUnique({
		where: { id: Number(id) },
	});
	if (research) {
		res.json(research);
	} else {
		res.status(404).json({ error: "Research not found" });
	}
});

app.get("/archives/:id/file-status", async (req, res) => {
	const parsedId = Number(req.params.id);
	if (!Number.isFinite(parsedId)) {
		return res.status(400).json({ error: "Invalid archive id" });
	}

	const research = await prisma.research.findUnique({
		where: { id: parsedId },
		select: {
			id: true,
			researchId: true,
		},
	});

	if (!research) {
		return res.status(404).json({ error: "Research not found" });
	}

	if (!research.researchId) {
		return res.json({ hasFile: false, viewUrl: null });
	}

	const filePath = resolveResearchFilePath(research.researchId);
	const hasFile = await doesFileExist(filePath);
	const host = req.get("host") ?? `localhost:${PORT}`;

	return res.json({
		hasFile,
		viewUrl: hasFile
			? `${req.protocol}://${host}/archives/${research.id}/file`
			: null,
	});
});

app.get("/archives/:id/file", async (req, res) => {
	const parsedId = Number(req.params.id);
	if (!Number.isFinite(parsedId)) {
		return res.status(400).json({ error: "Invalid archive id" });
	}

	const research = await prisma.research.findUnique({
		where: { id: parsedId },
		select: {
			researchId: true,
		},
	});

	if (!research || !research.researchId) {
		return res.status(404).json({ error: "Research file not found" });
	}

	const filePath = resolveResearchFilePath(research.researchId);
	const hasFile = await doesFileExist(filePath);

	if (!hasFile) {
		return res.status(404).json({ error: "Research file not found" });
	}

	res.setHeader("Content-Type", "application/pdf");
	res.setHeader(
		"Content-Disposition",
		`inline; filename="${research.researchId}.pdf"`,
	);

	return res.sendFile(filePath);
});

app.post(
	"/archives/:id/file",
	express.raw({
		type: ["application/pdf", "application/octet-stream"],
		limit: "20mb",
	}),
	async (req, res) => {
		const parsedId = Number(req.params.id);
		if (!Number.isFinite(parsedId)) {
			return res.status(400).json({ error: "Invalid archive id" });
		}

		const uploadedFile = req.body;
		if (!Buffer.isBuffer(uploadedFile) || uploadedFile.length === 0) {
			return res.status(400).json({ error: "PDF file is required" });
		}

		const research = await prisma.research.findUnique({
			where: { id: parsedId },
			select: {
				id: true,
				researchId: true,
			},
		});

		if (!research || !research.researchId) {
			return res.status(404).json({ error: "Research not found" });
		}

		await mkdir(RESEARCH_FILES_DIR, { recursive: true });
		const filePath = resolveResearchFilePath(research.researchId);
		await writeFile(filePath, uploadedFile);

		return res.status(201).json({
			message: "Research PDF uploaded successfully",
			fileName: `${research.researchId}.pdf`,
		});
	},
);

app.delete("/archives/:id", async (req, res) => {
	const parsedId = Number(req.params.id);
	if (!Number.isFinite(parsedId)) {
		return res.status(400).json({ error: "Invalid archive id" });
	}

	const research = await prisma.research.findUnique({
		where: { id: parsedId },
		select: {
			id: true,
			researchId: true,
		},
	});

	if (!research) {
		return res.status(404).json({ error: "Research not found" });
	}

	let deletedFile = false;

	if (research.researchId) {
		const filePath = resolveResearchFilePath(research.researchId);
		const hasFile = await doesFileExist(filePath);

		if (hasFile) {
			await unlink(filePath);
			deletedFile = true;
		}
	}

	await prisma.research.delete({
		where: { id: parsedId },
	});

	return res.json({
		message: "Research deleted successfully",
		deletedResearchId: parsedId,
		deletedFile,
	});
});

app.post("/archives", async (req, res) => {
	console.log("Received POST /archives request with body:", req.body);
	const { title, author, abstract, publishedAt, researchId, citation } =
		req.body;

	if (!title || !author || !abstract || !publishedAt) {
		return res.status(400).json({
			error: "title, author, abstract, and publishedAt are required",
		});
	}

	const parsedYear = Number(publishedAt);
	if (!Number.isFinite(parsedYear)) {
		return res.status(400).json({ error: "publishedAt must be a valid year" });
	}

	let normalizedResearchId =
		typeof researchId === "string" && researchId.trim()
			? researchId.trim()
			: "";

	if (!normalizedResearchId) {
		const yearPrefix = `${parsedYear}-`;
		const existingIds = await prisma.research.findMany({
			where: {
				researchId: {
					startsWith: yearPrefix,
				},
			},
			select: {
				researchId: true,
			},
		});

		const maxSequence = existingIds.reduce((highest, item) => {
			if (!item.researchId) {
				return highest;
			}

			const suffix = item.researchId.replace(yearPrefix, "");
			const parsedSequence = Number.parseInt(suffix, 10);
			if (!Number.isFinite(parsedSequence)) {
				return highest;
			}

			return Math.max(highest, parsedSequence);
		}, 0);

		normalizedResearchId = generateResearchId(parsedYear, maxSequence + 1);
	}

	if (!/^\d{4}-\d{3}$/.test(normalizedResearchId)) {
		return res.status(400).json({
			error: "researchId must follow YYYY-### format",
		});
	}

	const existingResearch = await prisma.research.findUnique({
		where: { researchId: normalizedResearchId },
		select: { id: true },
	});

	if (existingResearch) {
		return res.status(409).json({
			error: `Research ID ${normalizedResearchId} already exists`,
		});
	}

	const normalizedCitation =
		typeof citation === "string" && citation.trim()
			? citation.trim()
			: generateApaCitation(String(author), parsedYear, String(title));

	const newResearch = await prisma.research.create({
		data: {
			title,
			author,
			abstract,
			publishedAt: parsedYear,
			researchId: normalizedResearchId,
			citation: normalizedCitation,
		},
	});
	res.status(201).json(newResearch);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
