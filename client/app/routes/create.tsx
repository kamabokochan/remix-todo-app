import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(updates);

  await fetch(`http://localhost:8000/todo/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });
  return redirect("/");
};
