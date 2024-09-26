import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('http://localhost:3000/api/register/club_register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Show success message
        setSuccessMessage('Registration successful! Redirecting to login...');
        // Redirect to SignInClub.jsx after a delay
        setTimeout(() => {
          navigate('/signin-club');
        }, 2000); // Delay for 2 seconds before redirecting
      } else {
        setErrorMessage(result.message || 'Something went wrong');
      }
    } catch (error) {
      setErrorMessage('Internal server error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Register New Club...</h2>

        {/* Success Popup */}
        {successMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md shadow-md">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-lg font-bold text-green-600 mb-4">Success</h3>
              <p className="text-green-500 mb-4">{successMessage}</p>
              {/* <button
                className="bg-blue-900 text-white py-2 px-4 rounded"
                onClick={() => setSuccessMessage(null)}
              >
                Close
              </button> */}
            </div>
          </div>
        )}

        {/* Error Popup */}
        {errorMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md shadow-md">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-lg font-bold text-red-600 mb-4">Error</h3>
              <p className="text-red-500 mb-4">{errorMessage}</p>
              <button
                className="bg-blue-900 text-white py-2 px-4 rounded"
                onClick={() => setErrorMessage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Club Name"
                className="input-field"
                required
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Club Category"
                className="input-field"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Club Description"
                className="input-field col-span-2 resize-none"
                rows="3"
              ></textarea>
            </div>
          </div>

          {/* Leadership Details Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Leadership Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="president_name"
                value={formData.president_name}
                onChange={handleInputChange}
                placeholder="Club President Name"
                className="input-field"
              />
              <input
                type="text"
                name="vice_president_name"
                value={formData.vice_president_name}
                onChange={handleInputChange}
                placeholder="Club Vice President Name"
                className="input-field"
              />
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Club Email"
                className="input-field"
                required
              />
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Club Phone Number"
                className="input-field"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="input-field"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
            type="submit"
          >
            Submit Request
          </button>
        </form>

        {/* Already Have Account */}
        <p className="mt-4 text-center text-sm">
          Already Have Account? <a href="#" className="text-blue-600">Click Here</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpClub;