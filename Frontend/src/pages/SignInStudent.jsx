// src/components/SignInStudent.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom for navigation
import Navbar from "../components/NavbarLandingPage";

const SignInStudent = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In as Student</h2>
          <form>
            <input
              type="email"
              placeholder="Student Email"
              className="w-full p-3 border rounded mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded mb-4"
            />
            <button className="bg-blue-800 text-white w-full py-2 rounded hover:bg-blue-900">
              Sign In
            </button>
          </form>

          {/* Not Registered Link */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don&#39;t have an account?{" "}
              <Link to="/signup-student" className="text-indigo-600 hover:underline">
                Sign Up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInStudent;
