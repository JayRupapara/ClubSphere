import React from 'react';

const leaderboardData = [
  { rank: 1, name: 'AWS Cloud Club', popularity: '60%', members: '405', events: '20', activeRate: '75%' },
  { rank: 2, name: 'Cyber Security Club', popularity: '45%', members: '240', events: '16', activeRate: '84%' },
  { rank: 3, name: 'Google Student', popularity: '55%', members: '320', events: '19', activeRate: '79%' },
  { rank: 4, name: 'GDSE AI/ML', popularity: '72%', members: '1160', events: '30', activeRate: '77%' },
  { rank: 5, name: 'Chorusat Cycling', popularity: '48%', members: '780', events: '11', activeRate: '65%' },
  { rank: 6, name: 'CU Gym', popularity: '61%', members: '1200', events: '22', activeRate: '52%' },
  { rank: 7, name: 'DEPSTAR Union', popularity: '29%', members: '183', events: '5', activeRate: '31%' },
  { rank: 8, name: 'CSPIT Unions', popularity: '48%', members: '360', events: '8', activeRate: '82%' },
  { rank: 9, name: 'AWS Cloud Club Meetup', popularity: '50%', members: '240', events: '3', activeRate: '72%' },
  { rank: 10, name: 'AWS Cloud Club Meetup', popularity: '47%', members: '142', events: '3', activeRate: '69%' },
  { rank: 11, name: 'AWS Cloud Club Meetup', popularity: '48%', members: '145', events: '3', activeRate: '73%' },
];

const Leaderboard = () => {
  return (
    <div className="container bg-gray-100 mx-auto p-4">
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-left text-sm text-gray-500">
          <thead className="text-gray-700">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Popularity</th>
              <th className="py-3 px-6">Members</th>
              <th className="py-3 px-6">Posted Events</th>
              <th className="py-3 px-6">Active Rate</th>
              <th className="py-3 px-6">More</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((item) => (
              <tr key={item.rank} className="border-b">
                <td className="py-3 px-6">{item.rank}</td>
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">
                  <span className="inline-block bg-blue-100 text-blue-500 rounded-full px-2 py-1">
                    {item.popularity}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <span className="inline-block bg-orange-100 text-orange-500 rounded-full px-2 py-1">
                    {item.members}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <span className="inline-block bg-green-100 text-green-500 rounded-full px-2 py-1">
                    {item.events}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <span className="inline-block bg-purple-100 text-purple-500 rounded-full px-2 py-1">
                    {item.activeRate}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <button className="text-white bg-gray-700 hover:bg-gray-800 rounded-full px-4 py-1">
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

export default Leaderboard;