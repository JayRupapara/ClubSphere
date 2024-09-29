import React, { useState } from 'react';

const ClubEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "AWS Cloud Infrastructure Camp",
      description: "About AWS Cloud Infrastructure Camp events and more details",
      venue: "DEPSTAR, Seminar Hall (329)",
      time: "10:30 AM",
      duration: "2 Hours",
      participants: 67,
      image: "https://via.placeholder.com/500",
      rating: 5
    }
  ]);

  // States for new event form inputs
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    venue: '',
    time: '',
    duration: '',
    participants: '',
    image: ''
  });

  // Open Modal
  const handleAddEvent = () => {
    setShowModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle input change for the new event form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.venue && newEvent.time) {
      setEvents([...events, newEvent]);  // Add new event to the list
      setShowModal(false);  // Close the modal after submission
      setNewEvent({ title: '', description: '', venue: '', time: '', duration: '', participants: '', image: '' });  // Reset the form
    }
  };

  return (
    <div className="flex justify-between bg-gray-100">
      {/* Left section: Filters and event list */}
      <div className="w-8/12 p-4">
        {/* Apply Filters Section */}
        <div className="bg-white p-4 shadow-md rounded-2xl mb-6 flex justify-between items-center">
          <div>
            <p className="font-bold text-lg">Apply Filters</p>
            <div className="flex mt-4 space-x-3">
              <button className="px-3 py-1 bg-red-200 text-red-500 rounded-full">Today</button>
              <button className="px-3 py-1 bg-green-200 text-green-500 rounded-full">Yesterday</button>
              <button className="px-3 py-1 bg-blue-200 text-blue-500 rounded-full">Tomorrow</button>
              <button className="px-3 py-1 bg-purple-200 text-purple-500 rounded-full">Other</button>
            </div>
          </div>
          {/* Add Event Button */}
          <button 
            onClick={handleAddEvent} 
            className="px-4 py-2 bg-blue-500 text-white rounded-2xl">
            Add Event
          </button>
        </div>

        {/* Event Cards */}
        <div className="space-y-6">
          {/* Map through events to dynamically add event cards */}
          {events.map((event, index) => (
            <div key={index} className="bg-white p-6 shadow-md rounded-2xl flex items-center space-x-6">
              <img src={event.image || "https://via.placeholder.com/500"} alt={event.title} className="w-40 h-40 rounded-2xl" />
              <div className="flex-grow">
                <h2 className="font-bold text-xl">{event.title}</h2>
                <p className="text-gray-500">{event.description}</p>
                <div className="mt-4 flex space-x-4">
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                    <p className="text-gray-500">{event.venue}</p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-clock text-gray-500 mr-2"></i>
                    <p className="text-gray-500">{event.time}</p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-hourglass-start text-gray-500 mr-2"></i>
                    <p className="text-gray-500">{event.duration}</p>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-users text-gray-500 mr-2"></i>
                    <p className="text-gray-500">{event.participants} Participants</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex">
                    {[...Array(event.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-yellow-500"></i>
                    ))}
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-2xl">Register</button>
                </div>
              </div>
            </div>
          ))}
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

      {/* Modal for Adding Event */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Event Name</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md"
                  placeholder="Event Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="venue"
                  value={newEvent.venue}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md"
                  placeholder="Event Location"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                <input
                  type="datetime-local"
                  name="time"
                  value={newEvent.time}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={newEvent.duration}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md"
                  placeholder="Event Duration (e.g., 2 Hours)"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Participants</label>
                <input
                  type="number"
                  name="participants"
                  value={newEvent.participants}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md"
                  placeholder="Number of Participants"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={newEvent.image}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md"
                  placeholder="Image URL (optional)"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-2xl"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubEvents;
