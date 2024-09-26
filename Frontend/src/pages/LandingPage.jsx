// src/pages/Home.jsx
// import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavbarLandingPage';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar/>
      {/* Hero Section */}
      <section className="bg-[#2c3e50] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Manage Your Clubs with Ease
          </h1>
          <p className="text-lg md:text-xl mb-8">
            A complete solution to handle events, members, and communications for clubs at Charusat University.
          </p>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Event Management</h3>
              <p className="text-gray-700">
                Easily manage club events and keep everyone updated.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Member Tracking</h3>
              <p className="text-gray-700">
                Track member participation and maintain records.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Communication Hub</h3>
              <p className="text-gray-700">
                A dedicated space for all your club communication needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-lg mb-8">
            Sign up as a student or admin to start managing your clubs efficiently.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/signin-student')}
              className="bg-[#2980b9] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#3498db] transition"
            >
              Sign In as Student
            </button>
            <button
              onClick={() => navigate('/signin-admin')}
              className="bg-[#c0392b] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#e74c3c] transition"
            >
              Sign In as Admin
            </button>
            <button
              onClick={() => navigate('/signup-student')}
              className="bg-[#16a085] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#1abc9c] transition"
            >
              Sign Up as Student
            </button>
            <button
              onClick={() => navigate('/signup-admin')}
              className="bg-[#8e44ad] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#9b59b6] transition"
            >
              Sign Up as Admin
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
