import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { List, Section, SectionDTO, TaskDTO } from "~/types";
import { connectToMongo } from "~/utils/mongodb";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Simple Todos" }];
};

export const loader = async () => {
  const db = await connectToMongo();
  const tasks = await db.collection<TaskDTO>("tasks").find().toArray();

  return json(
    tasks.reduce((acc, task) => {
      if (acc[task.name]) {
        acc[task.name].push(task);
      } else {
        acc[task.name] = [task];
      }
      return acc;
    }, {} as List)
  );
};

export default function Index() {
  const taskList = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Todo List</h1>
      {Object.keys(taskList).map((sectionName) => {
        const tasks = taskList[sectionName];
        return (
          <div key={sectionName}>
            <h2>{sectionName}</h2>
            {tasks.map((task) => (
              <div key={task.id}>
                <input type="checkbox" />
                <span>{task.name}</span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
