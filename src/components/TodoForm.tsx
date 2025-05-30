"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

interface TodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (todo: { title: string; dueDate: string }) => void;
}

const TodoFormSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  dueDate: yup.string().required("Due date is required"),
});

export default function TodoForm({ isOpen, onClose, onSubmit }: TodoFormProps) {
  // const [title, setTitle] = useState("");
  // const [dueDate, setDueDate] = useState("");

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (title.trim() && dueDate) {
  //     onSubmit({ title: title.trim(), dueDate });
  //     setTitle("");
  //     setDueDate("");
  //     onClose();
  //   }
  // };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-neutral-600 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Add New Todo</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <Formik
          initialValues={{
            title: "",
            dueDate: "",
          }}
          validationSchema={TodoFormSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 bg-neutral-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  placeholder="Enter todo title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Due Date
                </label>
                <Field
                  type="datetime-local"
                  name="dueDate"
                  className="w-full px-3 py-2 bg-neutral-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Add Todo
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
