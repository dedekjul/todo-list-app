"use client";

import { FaTrashAlt } from "react-icons/fa";

interface TodoItemProps {
  title: string;
  dueDate: string;
  status: "OPEN" | "DONE" | "OVERDUE";
  onDelete: () => void;
  onMarkDone: () => void;
}

export default function TodoItem({
  title,
  dueDate,
  status,
  onDelete,
  onMarkDone,
}: TodoItemProps) {
  const getStatusStyle = () => {
    switch (status) {
      case "OPEN":
        return "bg-neutral-300 text-gray-600";
      case "DONE":
        return "bg-green-500 text-white";
      case "OVERDUE":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-stretch min-h-[120px] justify-between px-6 py-4 bg-neutral-600 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div
          className={`rounded-full py-1 px-3 text-sm font-semibold w-fit ${getStatusStyle()}`}
        >
          {status}
        </div>
        <button
          onClick={onDelete}
          className="text-gray-400 bg-neutral-700 p-2 rounded-md"
        >
          <FaTrashAlt />
        </button>
      </div>

      <h1 className="text-lg font-bold text-white mt-2 max-w-9/12">{title}</h1>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-gray-300 mt-2">Due date:</p>
          <p className="text-sm text-gray-300">{dueDate}</p>
        </div>
        {status !== "DONE" && (
          <button
            onClick={onMarkDone}
            className="px-4 py-2 h-fit bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700"
          >
            DONE
          </button>
        )}
      </div>
      <div className="flex flex-col items-end justify-between h-full flex-shrink-0"></div>
    </div>
  );
}
