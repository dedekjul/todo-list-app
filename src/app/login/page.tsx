"use client";

import { FaArrowRight } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/types";
import { useEffect } from "react";
import { loginUser } from "@/state/login/loginSlice";

const LoginSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {isLoggedIn, name: currentUserName } = useAppSelector(state => state.user);
  const { todos } = useAppSelector(state => state.todos);

  useEffect(() => {
    if (isLoggedIn && currentUserName) {
      router.push('/home');
    }
  }, [isLoggedIn, currentUserName, router]);

  const handleSubmit = (values: { name: string }) => {
    const { name } = values;
    console.log("Login attempt with name:", name);
    
    const userTodos = todos.filter(todo => todo.userName === name);
    
    if (userTodos.length > 0) {
      console.log(`Welcome back ${name}! Found ${userTodos.length} existing todos.`);
    } else {
      console.log(`Welcome ${name}! This appears to be a new user.`);
    }
    
    dispatch(loginUser(name));
    
    router.replace('/home');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#36393F]">
      <div className="max-w-md w-full space-y-6 px-8">
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block font-bold text-white mb-2"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-3 py-4 border bg-[#40444B] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-gray-200  text-white placeholder-gray-400"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1"/>
              </div>
              <button type="submit" disabled={isSubmitting} className="flex justify-center items-center gap-2 bg-[#39C36D] text-white py-2 px-6 rounded-md">
                Next
                <FaArrowRight />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
