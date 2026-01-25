import "dotenv/config";
import express from "express";
import { prisma } from "./lib/prisma";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Research Realm Backend is running");
});
app.get("/archives", async (req, res) => {
  const archives = await prisma.research.findMany();
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
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
