"use client";
import React, { useState } from "react";
import { createTask } from "@/server/actions/todo";
import { useToast } from "@/hooks/use-toast";

interface AddTaskModalProps {
  userId: string
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { toast } = useToast();


  const handleAddTask = async () => {
    if (!title || !description) {
      toast({
        title: "Error",
        description: "Title and description are required",
        variant: "destructive",
      })
      return;
    };
    try {
      await createTask({
        task: {
          title,
          description,
          ownerId: userId,
          dueDate: new Date(),
        }
      });
      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while adding the task",
        variant: "destructive",
      })
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="m-4 bg-white p-6 rounded-lg shadow-lg text-black max-w-md w-full">
        <div className="flex mb-4">
          <h2 className="text-xl font-bold">Add New Task</h2>
          <button
            onClick={onClose}
            className="flex justify-center items-center ml-auto h-6 w-6 rotate-45 text-lg border border-black rounded-full hover:bg-gray-400"
          >
            +
          </button>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 border rounded-lg mb-2"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-2 border rounded-lg mb-4"
        />
        <div className="flex justify-start space-x-2">
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
