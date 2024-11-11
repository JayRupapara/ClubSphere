
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClubEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);

  // States for new event form inputs
  const [newEvent, setNewEvent] = useState({
    event_name: '',
    event_type: '',
    description: '',
    event_banner: '',
    participation_capacity: '',
    registration_last_date: '',
    event_date: '',
    event_start_time: '',
    event_end_time: '',
    venue: ''
  });

  // Fetch events from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('token');

        // Make the GET request to fetch events
        console.log(token);
        
        const response = await axios.get('http://localhost:3000/api/club/events', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Set the retrieved events to the state
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Failed to load events. Please try again later.');
      }
    };

    fetchEvents();
  }, []);

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

  // Handle the form submission with JWT token and API integration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if all required fields are filled
    if (
      !newEvent.event_name ||
      !newEvent.event_type ||
      !newEvent.participation_capacity ||
      !newEvent.registration_last_date ||
      !newEvent.event_date ||
      !newEvent.event_start_time ||
      !newEvent.event_end_time ||
      !newEvent.venue
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      // Get JWT token
      const token = localStorage.getItem('token');

      // Prepare the payload
      const payload = {
        event_name: newEvent.event_name,
        event_type: newEvent.event_type,
        description: newEvent.description,
        event_banner: newEvent.event_banner,
        participation_capacity: newEvent.participation_capacity,
        registration_last_date: newEvent.registration_last_date,
        event_date: newEvent.event_date,
        event_start_time: newEvent.event_start_time,
        event_end_time: newEvent.event_end_time,
        venue: newEvent.venue
      };

      // Make the POST request to register the new event
      const response = await axios.post('http://localhost:3000/api/club/club_event_register', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('New Club Event registered successfully');
        // Add the new event to the list of events
        setEvents([...events, { ...newEvent, event_id: response.data.event_id }]);
        setShowModal(false); // Close the modal
        // Reset the form after successful submission
        setNewEvent({
          event_name: '',
          event_type: '',
          description: '',
          event_banner: '',
          participation_capacity: '',
          registration_last_date: '',
          event_date: '',
          event_start_time: '',
          event_end_time: '',
          venue: ''
        });
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        alert(error.response.data.message || 'An error occurred while registering the event');
      } else {
        alert('An error occurred. Please try again.');
      }
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
          {/* Display fetched events */}
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="bg-white p-6 shadow-md rounded-2xl flex items-center space-x-6">
                <img src={event.event_banner || 'https://via.placeholder.com/500'} alt={event.event_name} className="w-40 h-40 rounded-2xl" />
                <div className="flex-grow">
                  <h2 className="font-bold text-xl">{event.event_name}</h2>
                  <p className="text-gray-500">{event.description || 'No description available'}</p>
                  <div className="mt-4 flex space-x-4">
                    <div className="flex items-center">
                      <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                      <p className="text-gray-500">{event.venue}</p>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-clock text-gray-500 mr-2"></i>
                      <p className="text-gray-500">
                        {`${new Date(event.event_start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.event_end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-users text-gray-500 mr-2"></i>
                      <p className="text-gray-500">{event.participation_count || 0} Participants</p>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-calendar-alt text-gray-500 mr-2"></i>
                      <p className="text-gray-500">Registration Last Date: {new Date(event.registration_last_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p>No events available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right section: Event Summary & Promotion */}
      <div className="w-4/12 p-4">
        {/* Event Summary */}
        <div className="bg-white p-6 shadow-md rounded-2xl mb-6">
          <p className="font-bold text-lg mb-4">Events Summary</p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between bg-red-100 rounded-2xl px-4 py-3">
              <p className="font-bold text-2xl">{events.length}</p>
              <p className="text-md font-semibold">Total Events</p>
            </div>
          </div>
        </div>

        {/* Promotion Section */}
        <div className="bg-white p-6 shadow-md rounded-2xl">
          <p className="font-bold text-lg">Promotion</p>
          <img
            src="https://via.placeholder.com/500x900"
            alt="Promotion"
            className="w-full h-64 rounded-2xl mt-4"
          />
        </div>
      </div>

      {/* Modal for adding new event */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 shadow-md rounded-xl w-fit">
            <h2 className="font-bold text-lg">Add New Event</h2>
            <form onSubmit={handleSubmit}>
 <div className="flex gap-2">
 <input 
                type="text" 
                name="event_name" 
                value={newEvent.event_name} 
                onChange={handleChange} 
                placeholder="Event Name" 
                required 
                className="w-full p-2 border rounded-xl mt-2" 
              />
              <input 
                type="text" 
                name="event_type" 
                value={newEvent.event_type} 
                onChange={handleChange} 
                placeholder="Event Type" 
                required 
                className="w-full p-2 border rounded-xl mt-2" 
              />
 </div>
              <textarea 
                name="description" 
                value={newEvent.description} 
                onChange={handleChange} 
                placeholder="Description" 
                className="w-full p-2 border rounded-xl mt-2" 
              />
<div className="flex gap-2">
<input 
                type="text" 
                name="event_banner" 
                value={newEvent.event_banner} 
                onChange={handleChange} 
                placeholder="Event Banner URL" 
                className="w-full p-2 border rounded-xl" 
              />
              <input 
                type="number" 
                name="participation_capacity" 
                value={newEvent.participation_capacity} 
                onChange={handleChange} 
                placeholder="Participation Capacity" 
                required 
                className="w-full p-2 border rounded-xl" 
              />
</div>
<div className="flex gap-2 items-center">
<input 
                type="date" 
                name="registration_last_date" 
                value={newEvent.registration_last_date} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded-xl mt-2" 
              /> <p className='mt-2'>To</p>
              <input 
                type="date" 
                name="event_date" 
                value={newEvent.event_date} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded-xl mt-2" 
              />
</div>
<div className="flex gap-2 items-center">              <input 
                type="time" 
                name="event_start_time" 
                value={newEvent.event_start_time} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded-xl mt-2" 
              /> <p className='mt-2'>To</p>
              <input 
                type="time" 
                name="event_end_time" 
                value={newEvent.event_end_time} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded-xl mt-2" 
              /></div>
              <input 
                type="text" 
                name="venue" 
                value={newEvent.venue} 
                onChange={handleChange} 
                placeholder="Venue" 
                required 
                className="w-full p-2 border rounded-xl mt-2" 
              />
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 rounded-xl mt-4"
              >
                Submit
              </button>
              <button 
                type="button" 
                onClick={handleCloseModal} 
                className="w-full bg-gray-300 py-2 rounded-xl mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubEvents;