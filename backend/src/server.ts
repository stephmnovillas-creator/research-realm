import "dotenv/config";
import cors from "cors";
import express from "express";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Research Realm Backend is running");
});
app.get("/archives", async (req, res) => {
	const { search, year } = req.query;
	const archives = await prisma.research.findMany({
		select: {
			author: true,
			id: true,
			publishedAt: true,
			title: true,
		},
		where: {
			AND: [
				search
					? {
							OR: [
								{ title: { contains: String(search),  } },
								{ author: { contains: String(search),  } },
								{ abstract: { contains: String(search), } },
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
		}
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
app.post("/archives", async (req, res) => {
	const { title, author, abstract, publishedAt } = req.body;
	const newResearch = await prisma.research.create({
		data: {
			title,
			author,
			abstract,
			publishedAt,
		},
	});
	res.status(201).json(newResearch);
});
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
