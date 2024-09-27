// import React from 'react'

// const Leaderboard = () => {
//   return (
//     <>
//     <div>Leaderboard</div>
//     </>
//   )
// }

// export default Leaderboard

import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { Bell, ChevronDown } from "lucide-react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ClubInsights = () => {
  const [clubs, setClubs] = useState([
    { id: 1, name: "AWS Cloud Club", status: "Approved" },
    { id: 2, name: "AWS Cloud Club", status: "Approved" },
    { id: 3, name: "AWS Cloud Club", status: "Pending" },
    { id: 4, name: "AWS Cloud Club", status: "Pending" },
    { id: 5, name: "AWS Cloud Club", status: "Approved" },
    { id: 6, name: "AWS Cloud Club", status: "Approved" },
    { id: 7, name: "AWS Cloud Club", status: "Rejected" },
    { id: 8, name: "AWS Cloud Club", status: "Approved" },
    { id: 9, name: "AWS Cloud Club", status: "Approved" },
    { id: 10, name: "AWS Cloud Club", status: "Approved" },
  ]);

  const popularDomainsData = {
    labels: ["AWS", "AI-ML", "NDLL", "GDSE", "CCC"],
    datasets: [
      {
        data: [30, 20, 15, 20, 15],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const preferenceTimeData = {
    labels: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
    ],
    datasets: [
      {
        label: "Time",
        data: [60, 40, 90, 30, 70, 20, 10, 80, 50, 95, 60, 40],
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const preferenceTimeOptions = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-gray-100 leading-normal tracking-normal">
      <div className="right flex-1 p-2">
        {/* Summary Boxes */}
        <div className="rounded-2xl mb-3 flex justify-between">
          <div className="m-2 w-9/12 rounded-2xl bg-white p-5 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <div className="mx-2">
                <p className="font-bold">Club Insights</p>
                <p className="text-xs opacity-50">Summary</p>
              </div>
              <div>
                <button
                  type="button"
                  className="rounded-2xl border-2 p-1 px-3 text-black"
                >
                  <i></i> Export
                </button>
              </div>
            </div>

            <div className="cards grid grid-cols-1 gap-6 md:grid-cols-5">
              <div className="rounded-2xl flex flex-col justify-between bg-pink-200 p-4">
                <i className="fas fa-calendar-alt mr-3 text-2xl text-pink-500"></i>
                <p className="text-3xl font-bold text-gray-900 py-3">27</p>
                <p className="text-md text-gray-700">Registered Clubs</p>
              </div>

              <div className="rounded-2xl flex flex-col justify-between bg-green-200 p-4">
                <i className="fas fa-check-circle mr-3 text-2xl text-green-500"></i>
                <p className="text-3xl font-bold text-gray-900">20</p>
                <p className="text-md text-gray-700">Approved Clubs</p>
              </div>

              <div className="rounded-2xl flex flex-col justify-between bg-yellow-200 p-4">
                <i className="fas fa-clock mr-3 text-2xl text-yellow-500"></i>
                <p className="text-3xl font-bold text-gray-900">7</p>
                <p className="text-md text-gray-700">Pending Clubs</p>
              </div>

              <div className="rounded-2xl flex flex-col justify-between bg-purple-200 p-4">
                <i className="fas fa-users mr-3 text-2xl text-purple-500"></i>
                <p className="text-3xl font-bold text-gray-900">5</p>
                <p className="text-md text-gray-700">Active Clubs</p>
              </div>

              <div className="rounded-2xl flex flex-col justify-between bg-blue-200 p-4">
                <i className="fas fa-user-slash mr-3 text-2xl text-blue-500"></i>
                <p className="text-3xl font-bold text-gray-900">5</p>
                <p className="text-md text-gray-700">Inactive Clubs</p>
              </div>
            </div>
          </div>

          <div className="m-2 w-3/12 bg-white rounded-2xl shadow p-6">
            <h3 className="text-md font-bold mb-4">Popular Domains</h3>
            <Pie data={popularDomainsData} />
          </div>
        </div>

        <div className="m-2 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Registered Clubs */}
          <div className="lg:col-span-9 bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Registered all Clubs</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">#</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Action</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((club) => (
                  <tr key={club.id} className="border-t">
                    <td className="py-2">{String(club.id).padStart(2, "0")}</td>
                    <td className="py-2">{club.name}</td>
                    <td className="py-2">
                      <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded">
                        Edit
                      </button>
                    </td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded ${getStatusColor(club.status)}`}
                      >
                        {club.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charts */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Preference Time</h3>
              <Bar data={preferenceTimeData} options={preferenceTimeOptions} />
            </div>
            <div className="bg-white rounded-2xl shadow p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Explore</h3>
              <div className="flex flex-col space-y-2">
                <button className="bg-white w-full text-gray-800 border border-gray-300 px-4 py-2 rounded">
                  Create New Club
                </button>
                <button className="bg-white w-full text-gray-800 border border-gray-300 px-4 py-2 rounded">
                  View Free Time Slots
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Explore */}
      </div>
    </div>
  );
};

// const SummaryBox = ({ title, value, color }) => (
//   <div className={`${color} rounded-2xl p-4`}>
//     <div className="text-3xl font-bold">{value}</div>
//     <div>{title}</div>
//   </div>
// );

const getStatusColor = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-600";
    case "Pending":
      return "bg-yellow-100 text-yellow-600";
    case "Rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default ClubInsights;
