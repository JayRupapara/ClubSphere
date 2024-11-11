import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import Navbar from '../components/NavbarLandingPage';

const SignUpClub = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    president_name: '',
    vice_president_name: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/api/register/club_register', formData);

      // Log the response for debugging
      console.log(response);

      if (response.status === 200) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/signin-club'); // Navigate to sign-in page
        }, 100);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Something went wrong');
      } else {
        setErrorMessage('Internal server error');
      }
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">Register New Club</h2>

          {successMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl shadow-md">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-green-600 mb-4">Success</h3>
                <p className="text-green-500 mb-4">{successMessage}</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl shadow-md">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-red-600 mb-4">Error</h3>
                <p className="text-red-500 mb-4">{errorMessage}</p>
                <button
                  className="bg-blue-900 text-white py-2 px-4 rounded-2xl"
                  onClick={() => setErrorMessage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Club Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Club Category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                />
              </div>

              <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Club Description"
                  className="w-full px-3 mt-4 border border-gray-300 rounded-2xl resize-none"
                  rows="3"
                ></textarea>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Leadership Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="president_name"
                  value={formData.president_name}
                  onChange={handleInputChange}
                  placeholder="Club President Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                />
                <input
                  type="text"
                  name="vice_president_name"
                  value={formData.vice_president_name}
                  onChange={handleInputChange}
                  placeholder="Club Vice President Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Club Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                  required
                />
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  placeholder="Club Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                />
              </div>
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-2xl"
                required
              />
            </div>

            <button
              className="w-full bg-black text-white py-2 rounded-2xl hover:bg-gray-500 transition"
              type="submit"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already Have Account?{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate('/signin-club')}
            >
              Click Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpClub;