// src/components/SignInAdmin.js
// import React from 'react';

const SignInAdmin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In as Admin</h2>
        <form>
          <input
            type="email"
            placeholder="Admin Email"
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
      </div>
    </div>
  );
};

export default SignInAdmin;
