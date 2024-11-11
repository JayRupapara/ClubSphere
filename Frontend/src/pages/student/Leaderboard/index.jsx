// src/components/StudentLeaderboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentLeaderboard = () => {
  const [clubsData, setClubsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubsData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Token is missing or expired. Please sign in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/student/getClubDetailsByStudentEvent', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.data && response.data.clubs) {
          setClubsData(response.data.clubs);
        } else {
          throw new Error('No club data found');
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container bg-gray-100 mx-auto p-4">
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-center bg-white rounded-lg shadow-md">
          <thead className="border-b-2 bg-white">
            <tr>
              <th className="px-4 py-4">#</th>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Popularity</th>
              <th className="px-4 py-4">Members</th>
              <th className="px-4 py-4">Posted Events</th>
              <th className="px-4 py-4">Active Rate</th>
              <th className="px-4 py-4">More</th>
            </tr>
          </thead>
          <tbody>
            {clubsData.map((club, index) => (
              <tr
                key={club.club_id}
                className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-white'}`}
              >
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4">{club.club_name}</td>
                <td className="px-4 py-4">
                  <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
                    {club.popularity || 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="bg-orange-100 text-orange-600 py-1 px-3 rounded-full">
                    {club.total_members}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full">
                    {club.total_posted_events}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="bg-purple-100 text-purple-600 py-1 px-3 rounded-full">
                    {club.active_rate ? `${(club.active_rate * 100).toFixed(2)}%` : 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button className="bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-300">
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentLeaderboard;