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
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="right flex-1 p-2">
        <div className="flex">
          <div className="m-2 w-7/12 rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="mx-2">
                <p className="font-bold">Today&apos; Event</p>
                <p className="text-xs opacity-50">Summary</p>
              </div>
              <div>
                <button
                  type="button"
                  className="rounded-md border-2 p-1 px-3 text-black"
                >
                  <i></i> Export
                </button>
              </div>
            </div>
            <div className="cards grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="rounded-2xl flex flex-col justify-between bg-pink-200 p-4">
                <i className="fas fa-calendar-alt mr-3 text-2xl text-pink-500"></i>
                <p className="text-3xl font-bold text-gray-900 py-3">1k</p>
                <p className="text-md text-gray-700">Total Events</p>
              </div>

              <div className="rounded-2xl flex flex-col justify-between bg-yellow-200 p-4">
                <i className="fas fa-users mr-3 text-2xl text-yellow-500"></i>
                <p className="text-3xl font-bold text-gray-900 ">300</p>
                <p className="text-md text-gray-700">Total Participants</p>
              </div>

              <div className="rounded-2xl flex flex-col justify-between bg-green-200 p-4">
                <i className="fas fa-calendar-check mr-3 text-2xl text-green-500"></i>
                <p className="text-3xl font-bold text-gray-900">5</p>
                <p className="text-md text-gray-700">Upcoming Events</p>
              </div>

              <div className="rounded-2xl flex flex-col justify-between bg-purple-200 p-4">
                <i className="fas fa-user-plus mr-3 text-2xl text-purple-500"></i>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-md text-gray-700">New Users</p>
              </div>
            </div>
          </div>
          <div className="m-2 w-5/12">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Visitor Insights
              </h2>
              <canvas id="visitorChart"></canvas>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="m-2 w-5/12 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Current & Upcoming Events
            </h2>
            <ul>
              <li className="m-2 flex items-center justify-between">
                <div>
                  AWS Cloud Club Meetup
                  <p className="text-xs opacity-70">
                    Time: 10:00 AM to 12:00 PM
                  </p>
                </div>
                <button
                  type="button"
                  className="h-fit w-3/12 rounded-md bg-green-500 bg-opacity-25 py-2 text-xs"
                >
                  Running
                </button>
              </li>
              <hr></hr>
              <li className="m-2 flex items-center justify-between">
                <div>
                  AWS Cloud Club Meetup
                  <p className="text-xs opacity-70">
                    Time: 10:00 AM to 12:00 PM
                  </p>
                </div>
                <button
                  type="button"
                  className="h-fit w-3/12 rounded-md bg-yellow-500 bg-opacity-25 py-2 text-xs"
                >
                  Next
                </button>
              </li>
              <hr></hr>
              <li className="m-2 flex items-center justify-between">
                <div>
                  AWS Cloud Club Meetup
                  <p className="text-xs opacity-70">
                    Time: 10:00 AM to 12:00 PM
                  </p>
                </div>
                <button
                  type="button"
                  className="h-fit w-3/12 rounded-md bg-pink-500 bg-opacity-25 py-2 text-xs"
                >
                  Upcoming
                </button>
              </li>
              <hr></hr>
            </ul>
          </div>
          <div className="flex">
            <div className="m-2 w-6/12 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Student&apos;s Satisfaction
              </h2>
              <canvas id="satisfactionChart"></canvas>
            </div>
            <div className="m-2 w-6/12 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Target vs Reality
              </h2>
              <canvas id="targetRealityChart"></canvas>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex w-auto">
            <div className="m-2 w-6/12 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Popular Domains
              </h2>
              <canvas id="popularDomainsChart"></canvas>
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
      </div>
    </div>
  );
};

export default ClubHome;
