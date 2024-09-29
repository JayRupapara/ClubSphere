import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const RegisterMember = ({ addMember }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  RegisterMember.propTypes = {
    addMember: PropTypes.func.isRequired,
  };

  const navigate = useNavigate();

  const handlMembers = () => {
    navigate('/club_dashboard/members');
  };

  const handleSignInRedirect = () => {
    navigate('/club_dashboard/signin');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    addMember({ name, role, skills, email, password });
    setName('');
    setRole('');
    setSkills('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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
          onClick={handlMembers}
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

export default RegisterMember;
