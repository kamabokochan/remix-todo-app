import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
  Form,
} from "@remix-run/react";

export async function loader() {
  return await fetch("http://localhost:8000/todos");
}

export async function action({ request }) {
  console.log(request);
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

  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>なんかTODOっぽいやつ🧸</h1>
        <Form action={`create`} method="post">
          <input type="text" name="title" />
          <button type="submit">追加</button>
        </Form>
        <ul>
          {data.map((todo) => (
            <li
              key={todo.id}
              style={{ display: "flex", "align-items": "center", gap: "30px" }}
            >
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
