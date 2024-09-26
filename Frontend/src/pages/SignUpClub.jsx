import React from 'react';

const SignUpClub = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Register New Club...</h2>
        
        {/* Basic Information Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Club Name"
              className="input-field"
            />
            <input
              type="text"
              placeholder="Club Category"
              className="input-field"
            />
            <textarea
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
              placeholder="Club President Name"
              className="input-field"
            />
            <input
              type="text"
              placeholder="Club Vice President Name"
              className="input-field"
            />
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Club Email"
              className="input-field"
            />
            <input
              type="tel"
              placeholder="Club Phone Number"
              className="input-field"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
          type="submit"
        >
          Submit Request
        </button>
        
        {/* Already Have Account */}
        <p className="mt-4 text-center text-sm">
          Already Have Account? <a href="#" className="text-blue-600">Click Here</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpClub;
