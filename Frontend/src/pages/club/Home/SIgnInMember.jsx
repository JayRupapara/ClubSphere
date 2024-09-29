import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInMember = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log("Email:", email, "Password:", password);
    navigate('/club_dashboard'); // Navigate to dashboard after sign-in
  };

  const handleRegisterRedirect = () => {
    navigate('/club_dashboard/register'); // Navigate to the register page
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 h-full">  
      <h2 className="mb-6 text-3xl font-bold text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800"
        >
          Sign In
        </button>
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{' '}
          <button onClick={handleRegisterRedirect} className="text-blue-600">
            Register Here
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignInMember;
