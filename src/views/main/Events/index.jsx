import React from 'react';

const Events = () => {
  return (
    <div className="flex justify-between bg-gray-100">
      {/* Left section: Filters and event list */}
      <div className="w-8/12 p-4">
        {/* Apply Filters Section */}
        <div className="bg-white p-4 shadow-md rounded-2xl mb-6">
          <p className="font-bold text-lg">Apply Filters</p>
          <div className="flex mt-4 space-x-3">
            <button className="px-3 py-1 bg-red-200 text-red-500 rounded-full">Today</button>
            <button className="px-3 py-1 bg-green-200 text-green-500 rounded-full">Yesterday</button>
            <button className="px-3 py-1 bg-blue-200 text-blue-500 rounded-full">Tomorrow</button>
            <button className="px-3 py-1 bg-purple-200 text-purple-500 rounded-full">Other</button>
          </div>
        </div>

        {/* Event Cards */}
        <div className="space-y-6">
          {/* Event 1 */}
          <div className="bg-white p-6 shadow-md rounded-2xl flex items-center space-x-6">
            <img src="https://via.placeholder.com/500" alt="AWS Event" className="w-40 h-40 rounded-2xl" />
            <div className="flex-grow">
              <h2 className="font-bold text-xl">AWS Cloud Infrastructure Camp</h2>
              <p className="text-gray-500">About AWS Cloud Infrastructure Camp events and more details</p>
              <div className="mt-4 flex space-x-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                  <p className="text-gray-500">DEPSTAR, Seminar Hall (329)</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-clock text-gray-500 mr-2"></i>
                  <p className="text-gray-500">10:30 AM</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-hourglass-start text-gray-500 mr-2"></i>
                  <p className="text-gray-500">2 Hours</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-users text-gray-500 mr-2"></i>
                  <p className="text-gray-500">67 Participants</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <i key={index} className="fas fa-star text-yellow-500"></i>
                  ))}
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-2xl">Register</button>
              </div>
            </div>
          </div>

          {/* Event 2 */}
          <div className="bg-white p-6 shadow-md rounded-2xl flex items-center space-x-6">
            <img src="https://via.placeholder.com/500" alt="Google Cloud" className="w-40 h-40 rounded-2xl" />
            <div className="flex-grow">
              <h2 className="font-bold text-xl">Google Cloud Next &#39;24</h2>
              <p className="text-gray-500">About Google Cloud Next events and more details</p>
              <div className="mt-4 flex space-x-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                  <p className="text-gray-500">Mandalay Bay, Las Vegas</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-clock text-gray-500 mr-2"></i>
                  <p className="text-gray-500">10:30 AM</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-hourglass-start text-gray-500 mr-2"></i>
                  <p className="text-gray-500">2 Hours</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-users text-gray-500 mr-2"></i>
                  <p className="text-gray-500">67 Participants</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <i key={index} className="fas fa-star text-yellow-500"></i>
                  ))}
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-2xl">Register</button>
              </div>
            </div>
          </div>

          {/* Event 3 */}
          <div className="bg-white p-6 shadow-md rounded-2xl flex items-center space-x-6">
            <img src="https://via.placeholder.com/500" alt="AI-ML Meetup" className="w-40 h-40 rounded-2xl" />
            <div className="flex-grow">
              <h2 className="font-bold text-xl">AI-ML Meetup</h2>
              <p className="text-gray-500">About AI-ML Meetup events and more details</p>
              <div className="mt-4 flex space-x-4">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                  <p className="text-gray-500">DEPSTAR, Seminar Hall (329)</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-clock text-gray-500 mr-2"></i>
                  <p className="text-gray-500">10:30 AM</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-hourglass-start text-gray-500 mr-2"></i>
                  <p className="text-gray-500">2 Hours</p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-users text-gray-500 mr-2"></i>
                  <p className="text-gray-500">67 Participants</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <i key={index} className="fas fa-star text-yellow-500"></i>
                  ))}
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-2xl">Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section: Event Summary & Promotion */}
      <div className="w-4/12 p-4">
        {/* Event Summary */}
        <div className="bg-white p-6 shadow-md rounded-2xl mb-6">
          <p className="font-bold text-lg mb-4">Events Summary</p>
          <div className="mt-4 space-y-4">
            {/* Today's Events */}
            <div className="flex items-center justify-between bg-red-100 rounded-2xl px-4 py-3">
              <p className="font-bold text-2xl">27</p>
              <p className="text-md font-semibold">Today&#39;s Events</p>
            </div>

            {/* Tomorrow's Events */}
            <div className="flex items-center justify-between bg-yellow-100 rounded-2xl px-4 py-3">
              <p className="font-bold text-2xl">12</p>
              <p className="text-md font-semibold">Tomorrow&#39;s Events</p>
            </div>

            {/* Yesterday's Events */}
            <div className="flex items-center justify-between bg-green-100 rounded-2xl px-4 py-3">
              <p className="font-bold text-2xl">14</p>
              <p className="text-md font-semibold">Yesterday&#39;s Events</p>
            </div>
          </div>
        </div>

        {/* Promotion Section */}
        <div className="bg-white p-6 shadow-md rounded-2xl">
          <p className="font-bold text-lg">Promotion</p>
          <img
            src="https://via.placeholder.com/500x900"
            alt="Promotion"
            className="mt-4 w-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
