import React, { useState } from "react";
import Swal from "sweetalert2";
import image from "@images/cover/forgotpass.jpg";

const Sss = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    Swal.fire({
      title: "Success!",
      text: "We have sent a link to your email. Check your inbox.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover absolute inset-0"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950 bg-opacity-75"></div>

      <div className="relative w-full max-w-lg p-15 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-8 text-white text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            {/* <label htmlFor="email" className="block text-md font-medium text-white">
              Email Address
            </label> */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full h-8 text-white border-b-2 rounded-md border-border-white-700 bg-transparent focus:outline-none focus:ring-0 mb-5 mt-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 text-center text-black font-extrabold bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Reset Password
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-gray-500">
          Remembered your password?{" "}
          <a href="/login" className="text-yellow-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Sss;
