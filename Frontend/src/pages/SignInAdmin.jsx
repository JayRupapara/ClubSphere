// src/components/SignInAdmin.js
// import React from 'react';
import Navbar from '../components/NavbarLandingPage';

const SignInAdmin = () => {
  return (
    <div>     
         {/* <Navbar /> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In as Admin</h2>
          <form>
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
              Sign In
            </button>
          </form>

          {/* Not Registered Link */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don&#39;t have an account?{' '}
              {/* <Link to="/signup-club" className="text-indigo-600 hover:underline">
                Sign Up here
              </Link> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInAdmin;
