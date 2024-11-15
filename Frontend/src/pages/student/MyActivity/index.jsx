import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentMyActivity = () => {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the clubs when the component mounts
    const fetchClubs = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust if you store the token differently
        const response = await axios.get('http://localhost:3000/api/student/getClubsByStudentEvent', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the JWT token in the header
          },
        });
        setClubs(response.data.clubs); // Update the state with the response data
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch clubs');
      }
    };

    fetchClubs();
  }, []);

  return (
    <div className="container bg-gray-100 mx-auto p-4">
      <div className="bg-white p-4 mb-4 rounded-lg shadow-sm">
        <h1 className="text-lg font-bold">Select Time Slots</h1>
        <div className="p-4 bg-white flex justify-start gap-4">
          <button className="bg-orange-200 text-orange-600 px-6 py-2 rounded-lg font-semibold">
            My Joined Clubs
          </button>
          <button className="bg-green-200 text-green-600 px-6 py-2 rounded-lg font-semibold">
            Attended Events History
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Joined Clubs Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="font-semibold text-lg mb-4">Joined Clubs</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left py-2">#</th>
              <th className="text-left py-2">Name</th>
              <th className="text-right py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {clubs.length > 0 ? (
              clubs.map((club, index) => (
                <tr key={club.club_id} className="border-t">
                  <td className="py-2">{`0${index + 1}`}</td>
                  <td className="py-2">{club.club_name}</td>
                  <td className="py-2 text-right">
                    <button className="bg-white border border-gray-400 px-4 py-2 rounded-lg">
                      Unsubscribe
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No clubs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentMyActivity;
