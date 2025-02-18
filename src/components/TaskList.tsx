import React from "react";
import { Task } from "@prisma/client";
import { toggleTask as toggleTaskServer } from "@/server/actions/todo";
import { useToast } from "@/hooks/use-toast";
import { PenIcon } from "lucide-react";

export interface ITestState {
  listItems: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface TaskListProps {
  onTaskEdit: (task: any) => void;
  taskList: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ onTaskEdit, taskList }) => {

  const { toast } = useToast();

  const toggleTask = (id: number) => {
    try {
      toggleTaskServer(id);
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while toggling the task",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="p-4 space-y-4">
      {taskList.length > 0 ? (
        taskList.map((task: Task) => (
          <div
            key={task.id}
            className="group flex items-center justify-between bg-white p-4 rounded-xl shadow-lg shadow-gray-200 text-black hover:bg-gray-100/60 transition-colors"
          >
            <div className="flex items-start space-x-4  flex-1">
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full border-2 border-black shadow hover:shadow-md checked:bg-black checked:border-black"
                    id="check-custom-style"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 lucide lucide-check"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                </label>
              </div>
              <div
                className="grid items-start flex-1 cursor-pointer rounded-lg px-2"
                onClick={() => onTaskEdit(task)}
              >
                <p
                  className={`${task.completed ? "line-through" : ""
                    } text-lg font-bold group-hover:text-gray-800`}
                >
                  {task.title}
                </p>
                <p
                  className={`${task.completed ? "line-through" : ""} text-sm group-hover:text-gray-600`}
                >
                  {task.description}
                </p>
                
              </div>
              <span className="opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity ml-4">
                  <PenIcon className="h-4 w-4" />
                </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks for this day.</p>
      )}
    </div>
  );
};

export default TaskList;
