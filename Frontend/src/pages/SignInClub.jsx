// src/components/SignInClub.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import axios from 'axios'; // Import axios for making HTTP requests
import Navbar from '../components/NavbarLandingPage';

const SignInClub = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Clear error messages
    setSuccessMessage(null); // Clear success messages

    try {
      const response = await axios.post('http://localhost:3000/api/login/club_sign_in', formData);
      
      // Log the response for debugging
      console.log(response);

      if (response.status === 200) {
        // Successful login
        const { token } = response.data; // Assuming the JWT token is returned in the response

        // Store the token in local storage
        localStorage.setItem('token', token);

        setSuccessMessage('Signed in successfully! Redirecting...');
        // Redirect to a club dashboard or another page after successful login
        setTimeout(() => {
          navigate('/club_dashboard'); // Change '/club_dashboard' to your desired page after login
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        // Handle invalid email/password or other error
        setErrorMessage(error.response.data.message || 'Invalid email or password');
      } else {
        setErrorMessage('Internal server error');
      }
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In as Club</h2>

          {/* Success message */}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-2xl relative mb-4">
              {successMessage}
            </div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl relative mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Club Email"
              className="w-full p-3 border rounded-2xl mb-4"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-3 border rounded-2xl mb-4"
              required
            />
            <button
              className="bg-black text-white w-full py-2 rounded-2xl hover:bg-gray-700"
              type="submit"
            >
              Sign In
            </button>
          </form>

          {/* Not Registered Link */}
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don&#39;t have an account?{' '}
              <Link to="/signup-club" className="text-indigo-600 hover:underline">
                Sign Up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInClub;