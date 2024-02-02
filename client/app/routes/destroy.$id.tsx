import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return await fetch(`http://localhost:8000/todo/${params.id}`, {
    method: "DELETE",
  });
};

export const action = async ({ params }: ActionFunctionArgs) => {
  await fetch(`http://localhost:8000/todo/${params.id}`, {
    method: "DELETE",
  });
  return redirect("/");
};
