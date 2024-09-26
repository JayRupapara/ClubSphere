import React from "react";
import {Line, Bar, Pie } from "react-chartjs-2";

// Dummy Data (replace with dynamic data later)

// Gender Distribution Pie Chart
const genderDistributionData = {
  labels: ["Male", "Female"],
  datasets: [
    {
      data: [80, 20],
      backgroundColor: ["#3b82f6", "#f43f5e"],
    },
  ],
};

// Club Participation Bar Chart
const clubParticipationData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Reality Participants",
      data: [8000, 8500, 8900, 9000, 9200, 8500, 8800],
      backgroundColor: "#10b981",
    },
    {
      label: "Target Participants",
      data: [10000, 10500, 11000, 11500, 12000, 11000, 12100],
      backgroundColor: "#f59e0b",
    },
  ],
};
// Average Student Age Line Chart
const avgStudentAgeData = {
  labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  datasets: [
    {
      label: "Male",
      data: [65, 59, 80, 81, 56, 55, 40, 65, 70, 60],
      borderColor: "#6b7280",
      fill: false,
    },
    {
      label: "Female",
      data: [28, 48, 40, 19, 86, 27, 90, 80, 75, 67],
      borderColor: "#f43f5e",
      fill: false,
    },
  ],
};



// Preferable Time Bar Chart
const preferableTimeData = {
  labels: Array.from({ length: 24 }, (_, i) => i),
  datasets: [
    {
      label: "Preference %",
      data: [
        50, 40, 35, 45, 55, 65, 70, 75, 60, 55, 50, 48, 40, 42, 44, 55, 60, 65,
        70, 72, 80, 85, 60, 45,
      ],
      backgroundColor: "#f97316",
    },
  ],
};

// Students by Academic Year Bar Chart
const studentsByAcademicYearData = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
  datasets: [
    {
      label: "Students",
      data: [60, 70, 55, 80, 90, 85, 100, 75],
      backgroundColor: "#8b5cf6",
    },
  ],
};

// Popular Domains Pie Chart
const popularDomainsData = {
  labels: ["AWS", "AI-ML", "NDVL", "COC", "CDSE"],
  datasets: [
    {
      data: [40, 25, 15, 10, 10],
      backgroundColor: ["#34d399", "#f87171", "#60a5fa", "#fbbf24", "#a3e635"],
    },
  ],
};

// Registration Over Time Horizontal Bar Chart
const registrationOverTimeData = {
  labels: [
    "00:00",
    "02:00",
    "04:00",
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
  ],
  datasets: [
    {
      label: "Registrations",
      data: [50, 60, 40, 55, 70, 65, 80, 90, 75, 85, 100, 60],
      backgroundColor: "#22d3ee",
    },
  ],
};

const Students = () => {
  return (
    <div className="p-2 bg-gray-100">
      {/* Student Summary Cards */}
      <div className="flex">
        <div className="w-full m-2 rounded-2xl bg-white p-5 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <div className="mx-2">
              <p className="font-bold">Club Insights</p>
              <p className="text-xs opacity-50">Summary</p>
            </div>
          </div>

          <div className="cards grid grid-cols-1 gap-6 md:grid-cols-3">
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
          </div>
        </div>
        <div className="w-6/12 m-2 bg-white p-4 shadow-md rounded-2xl">
          <h2 className="text-lg font-semibold mb-4">Average Student Age</h2>
          <Line data={avgStudentAgeData} />
        </div>
      </div>

      {/* Graphs and Charts */}
      <div className="m-2 gap-4 flex">
        <div className="bg-white p-4 shadow-md rounded-2xl w-5/12">
          <h2 className="text-lg font-semibold mb-4">
            Preferable Time for Students
          </h2>
          <Bar data={preferableTimeData} />
        </div>

        <div className="bg-white p-4 shadow-md rounded-2xl w-3/12">
          <h2 className="text-lg font-semibold mb-4">Gender Distribution</h2>
          <Pie data={genderDistributionData} />
        </div>

        <div className="bg-white p-4 shadow-md rounded-2xl w-4/12">
          <h2 className="text-lg font-semibold mb-4">
            Club Participation Rate
          </h2>
          <Bar data={clubParticipationData} />
        </div>
        </div>
        
        <div className="m-2 gap-4 flex mt-4">

        <div className="bg-white p-4 shadow-md rounded-2xl w-4/12">
          <h2 className="text-lg font-semibold mb-4">
            Students by Academic Year
          </h2>
          <Bar data={studentsByAcademicYearData} />
        </div>

        <div className="bg-white p-4 shadow-md rounded-2xl w-3/12">
          <h2 className="text-lg font-semibold mb-4">Popular Domains</h2>
          <Pie data={popularDomainsData} />
        </div>

        <div className="bg-white p-4 shadow-md rounded-2xl w-5/12">
          <h2 className="text-lg font-semibold mb-4">Registration Over Time</h2>
          <Bar data={registrationOverTimeData} />
        </div>
      </div>
    </div>
  );
};

export default Students;
