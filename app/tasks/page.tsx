"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // for reading hrId cookie
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  taskTitle: string;
  description: string | null;
  assignedDate: string;
  dueDate: string;
  empFullName: string;
  hrFullName: string;
  status: "pending" | "in-progress" | "completed";
  employee: { id: number; fullName: string };
  assignedBy: { id: number; fullName: string };
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const hrId = Cookies.get("hrId"); // get HR id from cookie

  // Fetch tasks
  // Frontend
  const fetchTasks = async () => {
    try {
      // Get current HR info
      const meRes = await axios.get("http://localhost:3001/hr/me", {
        withCredentials: true,
      });
      const hrId = meRes.data.id;

      // Fetch tasks for this HR
      const res = await axios.get(`http://localhost:3001/hr/tasks/hr/${hrId}`, {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || err.message || "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:3001/hr/tasks/delete/${id}`, {
        withCredentials: true,
      });
      fetchTasks(); // refresh after deletion
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  // Navigate to edit page
  const editTask = (id: number) => {
    router.push(`tasks/edit_task/${id}`);
  };

  // Navigate to create new task
  const createTask = () => {
    router.push("/create_task");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (tasks.length === 0)
    return (
      <div className="mt-6 ml-63 mr-5">
        <button
          onClick={createTask}
          className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create New Task
        </button>
        <p className="text-center mt-4">No tasks found.</p>
      </div>
    );

  return (
    <div className="mt-6 ml-63 mr-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={createTask}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create New Task
        </button>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-300 shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Assigned Date</th>
            <th className="py-2 px-4 border">Due Date</th>
            <th className="py-2 px-4 border">Employee</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="text-center hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="py-2 px-4 border">{task.id}</td>
              <td className="py-2 px-4 border">{task.taskTitle}</td>
              <td className="py-2 px-4 border">{task.description || "-"}</td>
              <td className="py-2 px-4 border">
                {new Date(task.assignedDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{task.empFullName}</td>
              <td className="py-2 px-4 border capitalize">{task.status}</td>
              <td className="py-2 px-4 border flex justify-center gap-2">
                <button
                  onClick={() => editTask(task.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
