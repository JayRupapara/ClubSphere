// src/components/SignUpStudent.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom for navigation
import Navbar from "../components/NavbarLandingPage";

const SignUpStudent = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen py-4 bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-6">Register as Student</h2>
          <form>
            {/* Basic Information */}
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Input fields for Basic Information */}
              <input
                type="text"
                placeholder="First Name *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="Middle Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="Gender"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="date"
                placeholder="Date of Birth"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="Address"
                className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
            </div>

            {/* Educational Information */}
            <h3 className="text-lg font-semibold mb-4">Educational Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Student ID / Roll Number *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="College Name *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="Year of Study *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="Branch / Department *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="Course / Program *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
            </div>

            {/* Club Details */}
            <h3 className="text-lg font-semibold mb-4">Club Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Club(s) Interested In"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="Skills / Interests"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="Reason for Joining the Club"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="text"
                placeholder="Previous Club Experience"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
            </div>

            {/* Confidential Details */}
            <h3 className="text-lg font-semibold mb-4">Confidential Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring "
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:ring "
              >
                Register
              </button>
            </div>
          </form>

          {/* Already Registered Link */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Already registered?{" "}
              <Link to="/signin-student" className="text-indigo-600 hover:underline">
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpStudent;
