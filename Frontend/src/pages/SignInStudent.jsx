// src/components/SignInStudent.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import axios from 'axios'; // Import axios for making HTTP requests
import Navbar from "../components/NavbarLandingPage";

const SignInStudent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Make API request
      const response = await axios.post('http://localhost:3000/api/login/student_sign_in', {
        email,
        password,
      });

      // Save the JWT token in local storage
      localStorage.setItem('jwtToken', response.data.token);

      // Optionally navigate to another page, e.g., dashboard
      navigate('/student_dashboard'); // Change this to your desired route

    } catch (err) {
      // Handle errors
      if (err.response) {
        setError(err.response.data.message); // Set the error message from the response
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In as Student</h2>
          {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message display */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Student Email"
              className="w-full p-3 border rounded-2xl mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border rounded-2xl mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            <button type="submit" className="bg-black text-white w-full py-2 rounded-2xl hover:bg-gray-700">
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