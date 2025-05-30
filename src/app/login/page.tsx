import { FaArrowRight } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-700">
      <div className="max-w-md w-full space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block font-bold text-white mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-4 border bg-neutral-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300  text-white placeholder-gray-400"
            placeholder="Enter your name"
          />
        </div>

        <button  className="flex justify-center items-center gap-2 bg-green-400 text-white py-2 px-6 rounded-md">
          Next
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
