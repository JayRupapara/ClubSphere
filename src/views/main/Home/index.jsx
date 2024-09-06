import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Home = () => {
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
                100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
              ],
              borderColor: "rgb(255, 99, 132)",
              fill: false,
            },
            {
              label: "New Users",
              data: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600],
              borderColor: "rgb(54, 162, 235)",
              fill: false,
            },
            {
              label: "Unique Users",
              data: [
                150, 300, 450, 600, 750, 900, 1050, 1200, 1350, 1500, 1650,
                1800,
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
                3004, 3200, 3400, 3600, 3800, 4000, 4200, 4400, 4600, 4800,
                5000, 5200,
              ],
              borderColor: "rgb(75, 192, 192)",
              fill: false,
            },
            {
              label: "This Month",
              data: [
                4504, 4700, 4900, 5100, 5300, 5500, 5700, 5900, 6100, 6300,
                6500, 6700,
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
      "popularDomainsChart",
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
      "preferenceTimeChart",
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
      <div className="right flex-1 p-4 md:p-8">
        <div className="flex">
          <div className="m-2 w-7/12 rounded-lg bg-white p-5 shadow-md">
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
              <div className="rounded-lg bg-pink-200 p-4 pb-10">
                <div className="mb-2 flex items-center">
                  <i className="fas fa-calendar-alt mr-3 text-2xl text-pink-500"></i>
                  <p className="text-xl font-bold text-gray-900">1k</p>
                </div>
                <p className="text-sm text-gray-700">Total Events</p>
              </div>
              <div className="rounded-lg bg-yellow-200 p-4 pb-10">
                <div className="mb-2 flex items-center">
                  <i className="fas fa-users mr-3 text-2xl text-yellow-500"></i>
                  <p className="text-xl font-bold text-gray-900">300</p>
                </div>
                <p className="text-sm text-gray-700">Total Participants</p>
              </div>
              <div className="rounded-lg bg-green-200 p-4 pb-10">
                <div className="mb-2 flex items-center">
                  <i className="fas fa-calendar-check mr-3 text-2xl text-green-500"></i>
                  <p className="text-xl font-bold text-gray-900">5</p>
                </div>
                <p className="text-sm text-gray-700">Upcoming Events</p>
              </div>
              <div className="rounded-lg bg-purple-200 p-4 pb-10">
                <div className="mb-2 flex items-center">
                  <i className="fas fa-user-plus mr-3 text-2xl text-purple-500"></i>
                  <p className="text-xl font-bold text-gray-900">8</p>
                </div>
                <p className="text-sm text-gray-700">New Users</p>
              </div>
            </div>
          </div>
          <div className="m-2 w-5/12">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Visitor Insights
              </h2>
              <canvas id="visitorChart"></canvas>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="m-2 w-5/12 rounded-lg bg-white p-6 shadow-md">
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
          <div className="flex w-7/12">
            <div className="m-2 w-6/12 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Student&apos;s Satisfaction
              </h2>
              <canvas id="satisfactionChart"></canvas>
            </div>
            <div className="m-2 w-6/12 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Target vs Reality
              </h2>
              <canvas id="targetRealityChart"></canvas>
            </div>
          </div>
        </div>
        <div className="mt-6 flex">
          <div className="m-2 w-5/12 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 mt-6 text-xl font-bold text-gray-900">
              Yesterday&apos;s Top Events
            </h2>
            <ol className="flex flex-col">
              <li className="m-2 flex justify-between">
                Home Decor Range
                <p className="text-blue-500">45%</p>
              </li>
              <hr></hr>
              <li className="m-2 flex justify-between">
                Disney Princess Pink Bag 18”
                <p className="text-pink-500">29%</p>
              </li>
              <hr></hr>
              <li className="m-2 flex justify-between">
                Bathroom Essentials
                <p className="text-purple-500">18%</p>
              </li>
              <hr></hr>
              <li className="m-2 flex justify-between">
                Apple Smartwatches
                <p className="text-orange-500">25%</p>
              </li>
              <hr></hr>
            </ol>
          </div>
          <div className="flex w-7/12">
            <div className="m-2 w-6/12 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Popular Domains
              </h2>
              <canvas id="popularDomainsChart"></canvas>
            </div>
            <div className="m-2 w-6/12 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Preference Time
              </h2>
              <canvas id="preferenceTimeChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
