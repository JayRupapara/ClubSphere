import React from 'react';

const clubsData = [
  {
    id: 1,
    name: "AWS Cloud Club",
    popularity: "45%",
    members: 480,
    events: 35,
    activeRate: "99%",
  },
  {
    id: 2,
    name: "Cyber Security Club",
    popularity: "45%",
    members: 293,
    events: 35,
    activeRate: "87%",
  },
  {
    id: 3,
    name: "Google Student",
    popularity: "45%",
    members: 290,
    events: 35,
    activeRate: "79%",
  },
  {
    id: 4,
    name: "GDSE AI-ML",
    popularity: "45%",
    members: 153,
    events: 35,
    activeRate: "70%",
  },
  {
    id: 5,
    name: "Charusat Cycling",
    popularity: "45%",
    members: 100,
    events: 35,
    activeRate: "69%",
  },
  {
    id: 6,
    name: "CU Gym",
    popularity: "45%",
    members: 176,
    events: 35,
    activeRate: "55%",
  },
  {
    id: 7,
    name: "DEPSTAR Union",
    popularity: "45%",
    members: 153,
    events: 35,
    activeRate: "35%",
  },
  {
    id: 8,
    name: "CSPIT Unions",
    popularity: "45%",
    members: 153,
    events: 35,
    activeRate: "35%",
  },
  {
    id: 9,
    name: "AWS Cloud Club infrastructure Meetup",
    popularity: "45%",
    members: 153,
    events: 35,
    activeRate: "35%",
  },
  {
    id: 10,
    name: "AWS Cloud Club infrastructure Meetup",
    popularity: "45%",
    members: 153,
    events: 35,
    activeRate: "35%",
  },
];

const StudentLeaderboard = () => {
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
              key={club.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-white"
              }`}
            >
              <td className="px-4 py-4">{club.id}</td>
              <td className="px-4 py-4">{club.name}</td>
              <td className="px-4 py-4">
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
                  {club.popularity}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="bg-orange-100 text-orange-600 py-1 px-3 rounded-full">
                  {club.members}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full">
                  {club.events}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="bg-purple-100 text-purple-600 py-1 px-3 rounded-full">
                  {club.activeRate}
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