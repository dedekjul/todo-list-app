"use client";

import { FaArrowRight } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";

// interface LoginFormProps {
//   onSubmit: (values: { name: string }) => void;
// }

const LoginSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
});

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (values: { name: string }) => {
    console.log("Login with name:", values.name);
    // Redirect to home page
    router.push('/home');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-700">
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
              <div>
                <label
                  htmlFor="name"
                  className="block font-bold text-white mb-2"
                >
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-3 py-4 border bg-neutral-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300  text-white placeholder-gray-400"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1"/>
              </div>
              <button type="submit" disabled={isSubmitting} className="flex justify-center items-center gap-2 bg-green-400 text-white py-2 px-6 rounded-md">
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
