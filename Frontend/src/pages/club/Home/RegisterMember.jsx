import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

const RegisterMember = ({ addMember }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Added phone number field
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSignInRedirect = () => {
    navigate('/club_dashboard/signin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Get the JWT token from localStorage (assuming it's stored after login)
      const token = localStorage.getItem('token');

      // Make the API call to register the club member
      const response = await axios.post('/club_member_register', 
        {
          name, 
          role, 
          skills_interest: skills, 
          email, 
          phone_number: phoneNumber, 
          password 
        },
        {
          headers: {
            'Authorization': `Bearer ${token}` // Pass the JWT token in the header
          }
        }
      );
      
      // After successful registration, reset form fields and navigate
      setName('');
      setRole('');
      setSkills('');
      setEmail('');
      setPhoneNumber(''); // Reset phone number field
      setPassword('');
      setConfirmPassword('');

      alert(response.data.message); // Show success message
      navigate('/club_dashboard/members'); // Navigate to members page
    } catch (error) {
      console.error('Error registering club member:', error);
      alert(error.response?.data?.message || 'Error registering club member');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold text-center">Register New Club Member</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Skills/Interests</label>
              <input
                type="text"
                required
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
          <div className="gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Confidential Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800"
        >
          Submit Request
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

RegisterMember.propTypes = {
  addMember: PropTypes.func.isRequired,
};

export default RegisterMember;