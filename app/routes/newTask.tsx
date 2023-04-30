import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { connectToMongo } from "~/utils/mongodb";

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();

  const db = await connectToMongo();
  await db.collection("tasks").insertOne({
    section: body.get("section"),
    text: body.get("text"),
  });
  return redirect(`/`);
};

export default () => {
  return (
    <div>
      <h1>New Task</h1>
      <Form method="post">
        <label>Section</label>
        <div>
          <input name="section" />
        </div>
        <label>Task</label>
        <div>
          <input name="text" />
        </div>
        <button>Submit</button>
      </Form>
    </div>
  );
};
