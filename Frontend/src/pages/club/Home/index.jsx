import React, { useEffect, useRef, useState } from "react";
// Import useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

const ClubHome = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleAddMember = () => {
    navigate("/club_dashboard/register"); // Navigate to the register page
  };

  // Ref to hold chart instances
  const visitorChartRef = useRef(null);
  const satisfactionChartRef = useRef(null);
  const targetRealityChartRef = useRef(null);
  const popularDomainsChartRef = useRef(null);
  const preferenceTimeChartRef = useRef(null);

  useEffect(() => {
    // Destroy existing chart instance if it exists
    if (visitorChartRef.current) {
      visitorChartRef.current.destroy();
    }

    const visitorChartElement = document.getElementById("visitorChart");
    if (visitorChartElement) {
      const visitorCtx = visitorChartElement.getContext("2d");
      visitorChartRef.current = new Chart(visitorCtx, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Loyal Users",
              data: [
                100, 600, 300, 400, 500, 800, 700, 600, 900, 400, 1100, 1200,
              ],
              borderColor: "rgb(255, 99, 132)",
              fill: false,
            },
            {
              label: "New Users",
              data: [150, 500, 250, 450, 350, 100, 200, 50, 600, 550, 300, 400],
              borderColor: "rgb(54, 162, 235)",
              fill: false,
            },
            {
              label: "Unique Users",
              data: [
                1200, 1650, 750, 1500, 1350, 600, 1050, 1800, 300, 450, 900,
                150,
              ],
              borderColor: "rgb(75, 192, 192)",
              fill: false,
            },
          ],
        },
      });
    }

    // Similarly, initialize other charts
    if (satisfactionChartRef.current) {
      satisfactionChartRef.current.destroy();
    }
    const satisfactionChartElement =
      document.getElementById("satisfactionChart");
    if (satisfactionChartElement) {
      const satisfactionCtx = satisfactionChartElement.getContext("2d");
      satisfactionChartRef.current = new Chart(satisfactionCtx, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Last Month",
              data: [
                4200, 3600, 5000, 3004, 4800, 3200, 4400, 3800, 4600, 3400,
                5200, 4000,
              ],
              borderColor: "rgb(75, 192, 192)",
              fill: false,
            },
            {
              label: "This Month",
              data: [
                4900, 6300, 5500, 4504, 5700, 6700, 5100, 5900, 4700, 6100,
                6500, 5300,
              ],
              borderColor: "rgb(153, 102, 255)",
              fill: false,
            },
          ],
        },
      });
    }

    if (targetRealityChartRef.current) {
      targetRealityChartRef.current.destroy();
    }
    const targetRealityChartElement =
      document.getElementById("targetRealityChart");
    if (targetRealityChartElement) {
      const targetRealityCtx = targetRealityChartElement.getContext("2d");
      targetRealityChartRef.current = new Chart(targetRealityCtx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Reality Participants",
              data: [8823, 9000, 9200, 9400, 9600, 9800, 10000],
              backgroundColor: "rgb(75, 192, 192)",
            },
            {
              label: "Target Participants",
              data: [12122, 12200, 12500, 12700, 13000, 13500, 13800],
              backgroundColor: "rgb(255, 205, 86)",
            },
          ],
        },
      });
    }

    if (popularDomainsChartRef.current) {
      popularDomainsChartRef.current.destroy();
    }
    const popularDomainsChartElement = document.getElementById(
      "popularDomainsChart"
    );
    if (popularDomainsChartElement) {
      const popularDomainsCtx = popularDomainsChartElement.getContext("2d");
      popularDomainsChartRef.current = new Chart(popularDomainsCtx, {
        type: "pie",
        data: {
          labels: ["AWS", "AI-ML", "NDLL", "GDSE", "CCC"],
          datasets: [
            {
              data: [300, 50, 100, 80, 70],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
              ],
            },
          ],
        },
      });
    }

    if (preferenceTimeChartRef.current) {
      preferenceTimeChartRef.current.destroy();
    }

    const preferenceTimeChartElement = document.getElementById(
      "preferenceTimeChart"
    );
    if (preferenceTimeChartElement) {
      const preferenceTimeCtx = preferenceTimeChartElement.getContext("2d");
      preferenceTimeChartRef.current = new Chart(preferenceTimeCtx, {
        type: "bar",
        data: {
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
              data: [100, 60, 80, 50, 30, 10, 15, 70, 50, 80, 90, 70],
              backgroundColor: "rgba(0, 255, 0, 0.6)", // Green bars
              borderWidth: 1,
              borderRadius: 5, // Rounded corners
              borderSkipped: false,
            },
          ],
        },
        options: {
          indexAxis: "y", // Horizontal bars
          scales: {
            x: {
              beginAtZero: true,
              max: 100, // Maximum value for the x-axis
              grid: {
                color: "#ddd",
                borderDash: [5, 5],
              },
            },
            y: {
              grid: {
                color: "#ddd",
                borderDash: [5, 5],
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                boxWidth: 12,
                font: {
                  size: 12,
                },
              },
            },
            title: {
              display: true,
              // text: "Preference Time",
              font: {
                size: 18,
                weight: "bold",
              },
              padding: {
                top: 10,
                bottom: 20,
              },
              align: "start",
              color: "#1A2B5F", // Color matching the title in your image
            },
          },
          responsive: true,
          maintainAspectRatio: true, // Maintain the aspect ratio of the chart
        },
      });
    }

    // Clean up on component unmount
    return () => {
      if (visitorChartRef.current) visitorChartRef.current.destroy();
      if (satisfactionChartRef.current) satisfactionChartRef.current.destroy();
      if (targetRealityChartRef.current)
        targetRealityChartRef.current.destroy();
      if (popularDomainsChartRef.current)
        popularDomainsChartRef.current.destroy();
    };
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold text-center">Register New Club Member</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Skills/Interests</label>
              <input
                type="text"
                required
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
          <div className="gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Confidential Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="m-2 w-6/12 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Preference Time
              </h2>
              <canvas id="preferenceTimeChart"></canvas>
            </div>
          </div>
          <div className="m-2 w-5/12 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Explore</h2>
            <div className="flex flex-col items-center gap-4 p-4 w-full">
              <button
                className="w-full py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100"
                onClick={handleAddMember} // Navigate to register page
              >
                Add New Club Member
              </button>
              <button className="w-full py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100">
                View Free Time Slots
              </button>
              <button className="w-full py-2 bg-red-100 text-red-700 border border-red-300 rounded-lg hover:bg-red-200">
                Schedule or Host New Event
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800"
        >
          Submit Request
        </button>

        <p className="text-center mt-4 text-sm">
          Already Have Account?{' '}
          <button onClick={handleSignInRedirect} className="text-blue-600">
            Click Here
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterMember;