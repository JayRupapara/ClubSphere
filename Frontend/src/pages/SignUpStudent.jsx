import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // For password visibility toggle
import Navbar from "../components/NavbarLandingPage";

const SignUpStudent = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',  // Gender field is a dropdown now
    dob: '',
    phone_number: '',
    address: '',
    college_name: '',
    year_of_study: '',
    branch: '',
    course: '',
    interested_in: '',
    skills_interest: '',
    reason_for_joining_club: '',
    previous_club_experience: '',
    email: '',
    password: '',
    confirmPassword: '',
    profile_url: ''
  });

  const [error, setError] = useState('');  // Error state for form validation
  const [loading, setLoading] = useState(false);  // Loading state for API call
  const [showPassword, setShowPassword] = useState(false);  // For toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();  // To redirect after successful registration

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset any previous error

    // Basic validation for required fields and password match
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/register/student_register', formData);

      // If registration is successful, redirect to sign-in page
      if (response.status === 200) {
        navigate('/signin-student');
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        setError('Email already registered.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center min-h-screen py-4 bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-6">Register as Student</h2>

          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}  {/* Display error messages */}

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input type="text" name="first_name" placeholder="First Name *" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              <input type="text" name="middle_name" placeholder="Middle Name" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              <input type="text" name="last_name" placeholder="Last Name *" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />

              {/* Gender dropdown */}
              <select name="gender" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <input type="date" name="dob" placeholder="Date of Birth" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              <input type="tel" name="phone_number" placeholder="Phone Number" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              <input type="text" name="address" placeholder="Address" className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
            </div>

            {/* Educational Information */}
            <h3 className="text-lg font-semibold mb-4">Educational Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input type="text" name="college_name" placeholder="College Name *" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              <input type="text" name="year_of_study" placeholder="Year of Study *" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              <input type="text" name="branch" placeholder="Branch / Department *" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              <input type="text" name="course" placeholder="Course / Program *" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
            </div>

            {/* Club Details */}
            <h3 className="text-lg font-semibold mb-4">Club Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input type="text" name="interested_in" placeholder="Interested In" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              <input type="text" name="skills_interest" placeholder="Skills/Interests" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              <input type="text" name="reason_for_joining_club" placeholder="Reason for Joining Club" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              <input type="text" name="previous_club_experience" placeholder="Previous Club Experience" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
            </div>

            {/* Authentication Information */}
            <h3 className="text-lg font-semibold mb-4">Authentication</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <input type="email" name="email" placeholder="Email *" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
              
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password *" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
                <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="relative">
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password *" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
                <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <input type="text" name="profile_url" placeholder="Profile URL (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-2xl" onChange={handleChange} />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between mt-6">
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          
          <p className="text-sm text-center mt-4">
            Already have an account? <Link to="/signin-student" className="text-blue-600">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpStudent;