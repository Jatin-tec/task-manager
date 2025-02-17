"use client";
import React, { useState, useMemo } from "react";
import TaskList from "@/components/TaskList";
import AddTaskModal from "@/components/AddTaskDialog";
import EditTaskModal from "@/components/EditTaskDialog";
import { Task } from "@prisma/client";

interface TaskManagerProps {
  session: any;
  tasks: Task[];
}

export const TaskManager: React.FC<TaskManagerProps> = ({ session, tasks }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");


  const handleTaskEdit = (task: any) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "completed" && task.completed) ||
      (selectedStatus === "pending" && !task.completed);
      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      const aDate = new Date(a.dueDate);
      const bDate = new Date(b.dueDate);
      return sortOrder === "asc"
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    });
  }, [tasks, searchQuery, selectedStatus, sortOrder]);

  const statusOptions = useMemo(() => {
    return Array.from(['pending', 'completed']);
  }, []);


  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-50">
      <div className="max-w-lg mx-auto overflow-hidden">
        <h1 className="font-extrabold bg-white text-black text-2xl px-4 py-2">
          Tasks
        </h1>
        <header className="flex justify-center items-center bg-white rounded-br-3xl rounded-bl-3xl shadow-xl shadow-gray-200 p-4 mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex gap-4 flex-wrap">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
                <option value="asc">Due First</option>
                <option value="desc">Due Last</option>
            </select>
          </div>
        </header>

        <TaskList onTaskEdit={handleTaskEdit} taskList={filteredAndSortedTasks} />
      </div>
      <div>
        <AddTaskModal
          userId={session.id}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={editingTask}
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-6 right-[45%] bg-white text-black w-10 h-10 rounded-full shadow-xl flex items-center justify-center text-2xl"
        >
          +
        </button>
      </div>
    </main>
  );
};
