import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
  Form,
} from "@remix-run/react";
import { useState } from "react";

export async function loader() {
  return await fetch("http://localhost:8000/todos");
}

async function switchStatus(id) {
  console.log("change status");
  await fetch(`http://localhost:8000/status/${id}`, {
    method: "PUT",
  });
}

export default function App() {
  const data = useLoaderData();
  const [todo, setTodo] = useState("");

  async function addTodo() {
    try {
      await fetch(`http://localhost:8000/todo/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo,
        }),
      });
      setTodo("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>なんかTODOっぽいやつ🧸</h1>
        <Form method="post">
          <input
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <button onClick={() => addTodo()}>追加</button>
        </Form>
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                onChange={() => switchStatus(todo.id)}
                defaultChecked={todo.status === "completed"}
              />
              <p>{todo.title}</p>
              <Form action={`destroy/${todo.id}`} method="post">
                <button type="submit">Delete</button>
              </Form>
            </li>
          ))}
        </ul>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

export async function action() {
  return await fetch("http://localhost:8000/todos");
}
