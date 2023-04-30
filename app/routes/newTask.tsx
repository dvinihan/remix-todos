import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { Loading } from "~/components/Loading";
import type { Counter } from "~/types";
import { connectToMongo } from "~/utils/mongodb";

export const action = async ({ request }: ActionArgs) => {
  const body = await request.formData();
  const db = await connectToMongo();
  const taskCounter = await db
    .collection<Counter>("counters")
    .findOne({ name: "tasks" });

  if (!taskCounter) {
    throw Error("could not find task counter");
  }

  await db.collection("tasks").insertOne({
    id: taskCounter?.value,
    section: body.get("section"),
    text: body.get("text"),
  });
  await db
    .collection<Counter>("counters")
    .updateOne({ name: "tasks" }, { $set: { value: taskCounter.value + 1 } });
  return redirect(`/`);
};

export default () => {
  const navigation = useNavigation();
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
      {navigation.state !== "idle" && <Loading />}
    </div>
  );
};
