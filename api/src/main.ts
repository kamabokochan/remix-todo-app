import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
const PORT = 8000;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

async function main() {
  app.post("/todo/create", async (req, res) => {
    const { title } = req.body;
    const post = await prisma.todos.create({
      data: {
        title,
      },
    });
    return res.json(post);
  });

  app.put("/status/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.todos.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (todo === null) {
      res.status(404).json({ message: "IDが見つかりませんでした" });
      return;
    }

    const updatePost = await prisma.todos.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: todo.status === "pending" ? "completed" : "pending",
      },
    });
    res.json(updatePost);
  });

  app.get("/todos", async (req, res) => {
    const posts = await prisma.todos.findMany();
    return res.json(posts);
  });

  app.delete("/todo/:id", async (req, res) => {
    const { id } = req.params;
    const deletedPost = await prisma.todos.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedPost);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
