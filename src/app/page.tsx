import { getTasks } from "@/server/actions/todo";
import { TaskManager } from "./components/taskManager";
import { getSession } from "@/server/actions/auth";
import Link from "next/link";

export default async function Page() {
  const session = await getSession();
  if (!session) return (
    // not authenticated login to access you tasks
    <main className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50">
      <div className="max-w-lg mx-auto overflow-hidden">
        <h1 className="font-extrabold bg-white text-black text-2xl px-4 py-2">
          Tasks
        </h1>
        <p className="text-center text-gray-500 mt-4">
          Please login to access your tasks. {" "}
          <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </main>
  );
  const tasks = await getTasks(session.id as string);
  return <TaskManager session={session} tasks={tasks} />;
}