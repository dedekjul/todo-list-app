"use client";

import Loading from "@/components/Loading";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import { logoutUser } from "@/state/login/loginSlice";
import { addTodo, checkOverdueTodos, deleteTodo, markTodoDone } from "@/state/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { name: userName, isLoggedIn } = useAppSelector((state) => state.user);
  const { todos } = useAppSelector((state) => state.todos);

  const userTodos = todos.filter((todo) => todo.userName === userName);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn && userName) {
      dispatch(checkOverdueTodos());

      const interval = setInterval(() => {
        dispatch(checkOverdueTodos());
      }, 60000); 
      return () => clearInterval(interval); 
    }
  }, [isLoggedIn, userName, dispatch]);

  
  const handleDelete = (id: string) => {
    console.log(`Delete todo with id: ${id}`);
    dispatch(deleteTodo(id));
  };

  const handleMarkDone = (id: string) => {
    console.log(`Mark todo with id: ${id} as done`);
    dispatch(markTodoDone(id));
  };
  
  const formatDueDate= (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const handleAddTodo = (todoData: { title: string; dueDate: string }) => {
    const newTodo = {
      title: todoData.title,
      dueDate: todoData.dueDate,
      status: "OPEN" as const,
      userName: userName!,
    };

    dispatch(addTodo(newTodo));
    console.log("New todo added:", newTodo);
  };


  const handleLogout = () => {
    dispatch(logoutUser());
    router.replace("/login");
  };

  if (!isLoggedIn || !userName) {
    return <Loading message="Loading your todos..." />;
  }

  return (
    <div className="min-h-screen flex justify-center bg-[#36393F]">
      <div className="max-w-md w-full flex-1 px-8 py-10 space-y-6 relative">
        <div className="flex gap-5 items-center border-b border-neutral-600 pb-5">
          <button
            onClick={handleLogout}
            className="text-white"
          >
            <IoMdArrowRoundBack className="text-4xl" />
          </button>
          <h1 className="text-3xl font-bold text-white">Hi, {userName}</h1>
        </div>

        {userTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-2">No todos yet!</p>
            <p className="text-gray-500 text-sm">Click the + button to add your first todo</p>
          </div>
        ) : (
          <div className="space-y-4">
            {userTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                dueDate={formatDueDate(todo.dueDate)}
                status={todo.status}
                onDelete={() => handleDelete(todo.id)}
                onMarkDone={() => handleMarkDone(todo.id)}
              />
            ))}
          </div>
        )}
        <TodoForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={(todo) => {
            console.log("New todo submitted:", todo);
            handleAddTodo(todo);
            setIsFormOpen(false);
          }}
        />
        <button
          onClick={() => setIsFormOpen(true)}
          className="absolute bottom-8 right-8 bg-[#39C36D] text-neutral-700 py-4 px-6 text-4xl rounded-full shadow-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}
