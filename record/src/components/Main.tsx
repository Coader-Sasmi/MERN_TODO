"use client";

import { BASE_URL } from "@/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsCircle, BsFillCheckCircleFill } from "react-icons/bs";
import { HiTrash } from "react-icons/hi";
import Create from "./Create";

// Define a type for the todo items
interface Todo {
  _id: string;
  task: string;
  done: boolean;
}

export default function Main() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tasks`)
      .then((result) => setTodos(result.data))
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch tasks. Please try again later.");
      });
  }, []);

  const handleEdit = (id: string, done: boolean) => {
    axios
      .put(`${BASE_URL}/update/${id}`, { done: !done })
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !done } : todo
          )
        );
        // location.reload();
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to update task. Please try again later.");
      });
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`${BASE_URL}/delete/${id}`)
      .then((result) => location.reload())
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch tasks. Please try again later.");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <div className="border shadow-md rounded-md p-5 lg:w-1/3">
        <h2 className="py-2 font-semibold text-center heading_title pb-8">
          TODO LIST
        </h2>
        <Create />
      </div>

      {error && (
        <div className="p-3 text-red-500">
          <h2 className="font-medium text-xl">{error}</h2>
        </div>
      )}

      {todos.length === 0 ? (
        <div className="p-3">
          <h2 className="font-medium text-xl">No Record</h2>
        </div>
      ) : (
        <div className="mt-4 md:w-3/5 flex flex-col gap-4">
          {todos.map((item) => (
            <div
              key={item._id}
              className="p-2 bg-gray-50 text-primary rounded-md border flex justify-between items-center"
            >
              <div
                className="flex gap-2 items-center"
                onClick={() => handleEdit(item._id, item.done)}
              >
                {item.done ? <BsFillCheckCircleFill /> : <BsCircle />}
                <p
                  className={`font-semibold ${item.done ? "line-through" : ""}`}
                >
                  {item.task.toUpperCase()}
                </p>
              </div>
              <HiTrash
                className="text-xl"
                onClick={() => handleDelete(item?._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
