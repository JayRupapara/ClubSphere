// src/components/SignInStudent.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/NavbarLandingPage';

const SignInStudent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:3000/api/login/student_sign_in', {
  //       email,
  //       password,
  //     });

  //     localStorage.setItem('token', response.data.token);
  //     navigate('/student_dashboard');
  //   } catch (err) {
  //     if (err.response) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError('An error occurred. Please try again later.');
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login/student_sign_in', {
        email,
        password,
      });

      // Store token securely
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/student_dashboard');
      } else {
        throw new Error('Token not received');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };


  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In as Student</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Email Input with Floating Label */}
            <div className="relative mb-6"> {/* Added mb-6 for margin below */}
              <input
                type="email"
                id="email"
                className="peer w-full p-3 border border-gray-300 rounded-2xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Student Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-5 text-gray-600 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-black"
              >
                Student Email
              </label>
            </div>

            {/* Password Input with Floating Label */}
            <div className="relative mb-6"> {/* Added mb-6 for margin below */}
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="peer w-full p-3 border border-gray-300 rounded-2xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="password"
                className="absolute left-3 -top-5 text-gray-600 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-black"
              >
                Password
              </label>
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>

            <button
              type="submit"
              className="bg-black text-white w-full py-2 rounded-2xl hover:bg-gray-700 mb-4" // Added margin-bottom for button
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm">
              Don&#39;t have an account?{' '}
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