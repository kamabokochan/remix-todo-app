import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = 8000;

app.use(express.json());

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
