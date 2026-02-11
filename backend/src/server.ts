import "dotenv/config";
import cors from "cors";
import express from "express";
import authRoutes from "./(auth)/auth.routes";
import { prisma } from "./lib/prisma";
import {
  generateApaCitation,
  generateResearchId,
} from "./lib/research-generation";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Research Realm Backend is running");
});

// Auth routes
app.use("/api/auth", authRoutes);

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
