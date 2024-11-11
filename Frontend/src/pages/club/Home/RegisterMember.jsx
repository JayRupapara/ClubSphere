import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterMember = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    skills: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  // State for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Navigate to sign-in page
  const handleSignInRedirect = () => {
    navigate('/club_dashboard/signin');
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      setIsLoading(true); // Set loading state

      // Fetch token from localStorage (assuming token management after login)
      const token = localStorage.getItem('token');
      console.log(token);

      // Make the API call
      const response = await axios.post('http://localhost:3000/api/club/club_member_register',
        {
          name: formData.name,
          role: formData.role,
          skills_interest: formData.skills,
          email: formData.email,
          phone_number: formData.phoneNumber,
          password: formData.password
        },
        {
          headers: {
            'Authorization': `Bearer ${token}` // Authorization header with token
          }
        }
      );

      // Handle success response
      alert(response.data.message);

      // Reset form inputs
      setFormData({
        name: '',
        role: '',
        skills: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      });

      // Redirect to members page
      navigate('/club_dashboard/members');
    } catch (err) {
      console.error('Error registering club member:', err);
      setError(err.response?.data?.message || 'Error registering club member');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold text-center">Register New Club Member</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Skills/Interests</label>
              <input
                type="text"
                name="skills"
                required
                value={formData.skills}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Confidential Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </button>

        <p className="text-center mt-4 text-sm">
          Already Have Account?{' '}
          <button onClick={handleSignInRedirect} className="text-blue-600">
            Click Here
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterMember;