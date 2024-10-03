import React from 'react'

const StudentSettings = () => {
  return (
    <>
 <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 bg-gray-50">
        <ul className="space-y-4">
          <li className="font-medium text-gray-700">Basic Information</li>
          <li className="text-gray-500 hover:text-gray-700 cursor-pointer">Educational Information</li>
          <li className="text-gray-500 hover:text-gray-700 cursor-pointer">Club Details</li>
          <li className="text-gray-500 hover:text-gray-700 cursor-pointer">Password</li>
          {/* <li className="text-gray-500 hover:text-gray-700 cursor-pointer">Sign Out</li> */}
        </ul>
      </aside>

      {/* Main Form */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Basic Information</h2>
        <form className="space-y-4">
          {/* Upload Profile Image */}
          <div className="flex items-center space-x-4">
            <label className="block text-gray-700">Upload Profile Image</label>
            <input
              type="file"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-gray-700">First Name *</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="First Name"
            />
          </div>

          {/* Middle Name */}
          <div>
            <label className="block text-gray-700">Middle Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Middle Name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Last Name"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700">Gender</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Gender"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Phone Number"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Address"
            />
          </div>

          {/* Save Changes Button */}
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>    </>
  )
}

export default StudentSettings;