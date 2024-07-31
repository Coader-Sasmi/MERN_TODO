"use client";

import { BASE_URL } from "@/utils";
import axios from "axios";
import { useState } from "react";

export default function Create() {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    axios
      .post(`${BASE_URL}/add`, { task: task })
      .then((result) => location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex gap-2 justify-center">
      <input
        type="text"
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter Task"
        className="border border-primary py-1 px-3 rounded-md w-full"
      />
      <button
        onClick={handleAdd}
        type="button"
        className="btn_primary px-3 py-1 rounded-md text-sm"
      >
        ADD
      </button>
    </div>
  );
}
