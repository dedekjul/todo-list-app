import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  title: string;
  dueDate: string;
  status: "OPEN" | "DONE" | "OVERDUE";
  userName: string;
  createdAt: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'id' | 'createdAt'>>) => {
      const newTodo: Todo = {
        ...action.payload,
        id: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);
    },

    markTodoDone: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.status = "DONE";
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    checkOverdueTodos: (state) => {
      const currentTime = new Date();
      state.todos.forEach((todo) => {
        if (todo.status === "OPEN") { // Only check OPEN todos
          const dueDate = new Date(todo.dueDate);
          if (dueDate < currentTime) {
            todo.status = "OVERDUE";
          }
        }
      });
    },

    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, markTodoDone, deleteTodo, checkOverdueTodos, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
