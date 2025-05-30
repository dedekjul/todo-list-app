'use client'

import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import { useState } from "react";

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleDelete = (id: string) => {
    console.log(`Delete todo with id: ${id}`);
  };

  const handleMarkDone = (id: string) => {
    console.log(`Mark todo with id: ${id} as done`);
  };

  return (
    <div className="min-h-screen flex justify-center bg-neutral-700">
      <div className="max-w-md px-8 py-10 space-y-6 relative">
        <h1 className="text-3xl font-bold text-white mb-6">Hi, John Doe</h1>

        {/* Todo List Cards */}
        <TodoItem
          title="Submit Code to Taksu "
          dueDate="21 October 2021 07:30PM"
          status="OPEN"
          // onDelete={() => handleDelete('1')}
          // onMarkDone={() => handleMarkDone('1')}
        />
        <TodoItem
          title="Submit Code to Taksu blabla awdawdn dajwbf  dajwbdibaef"
          dueDate="21 October 2021 07:30PM"
          status="OPEN"
          // onDelete={() => handleDelete('1')}
          // onMarkDone={() => handleMarkDone('1')}
        />
        <TodoItem
          title="Submit Code to Taksu blabla awdawdn dajwbf  dajwbdibaef"
          dueDate="21 October 2021 07:30PM"
          status="OPEN"
          // onDelete={() => handleDelete('1')}
          // onMarkDone={() => handleMarkDone('1')}
        />

        <TodoForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={(todo) => {
            console.log("New todo submitted:", todo);
            setIsFormOpen(false);
          }}
        />
        <button onClick={() => setIsFormOpen(true)} className="absolute bottom-8 right-8 bg-green-400 text-neutral-700 py-4 px-6 text-4xl rounded-full shadow-lg">
          +
        </button>

      </div>
    </div>
  );
}
