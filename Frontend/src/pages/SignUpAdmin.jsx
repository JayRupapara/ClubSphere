// src/components/SignUpAdmin.js
// import React from 'react';

import Navbar from "../components/NavbarLandingPage";

const SignUpAdmin = () => {
  return (
    <div>
      {/* <Navbar/> */}
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up as Admin</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border rounded-2xl mb-4"
          />
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 border rounded-2xl mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-2xl mb-4"
          />
          <button className="bg-black text-white w-full py-2 rounded-2xl hover:bg-gray-700">
            Sign Up
          </button>
        </form>
      </div>
      </div>
      </div>
  );
};

export default SignUpAdmin;
