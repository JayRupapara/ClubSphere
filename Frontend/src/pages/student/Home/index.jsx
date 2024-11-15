import { Chart } from "chart.js";
import React, { useEffect, useRef, useState } from "react";

const StudentHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [attendedEvents, setAttendedEvents] = useState([]); // Track attended events

  const popularDomainsChartRef = useRef(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/student/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        // Transforming API data to suit the existing structure
        const formattedEvents = data.map((event) => ({
          title: event.event_name,
          description: event.description,
          venue: event.venue,
          time: `${event.event_date.split("T")[0]} | ${event.event_start_time}`,
          duration: `${parseFloat(event.duration).toFixed(2)} Hours`,
          participants: "N/A", // Assuming participant data is not available
          image: "https://via.placeholder.com/500", // Replace with actual image URL if available
          clubName: event.club_name,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle "Attend Now" button click
  const handleAttendNow = async (clubName, eventName) => {
    try {
      const response = await fetch("http://localhost:3000/api/student/attendnow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_name: clubName,
          event_name: eventName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAttendedEvents((prev) => [...prev, eventName]); // Add eventName to attended list
        console.log("Event attendance successful:", data);
      } else {
        const errorData = await response.json();
        console.error("Failed to attend event:", errorData.message);
      }
    } catch (error) {
      console.error("Error attending event:", error);
    }
  };

  // Chart setup remains unchanged
  useEffect(() => {
    if (popularDomainsChartRef.current) {
      popularDomainsChartRef.current.destroy();
    }
    const popularDomainsChartElement = document.getElementById("popularDomainsChart");
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

    return () => {
      if (popularDomainsChartRef.current) popularDomainsChartRef.current.destroy();
    };
  }, []);

  return (
    <div className="flex justify-between bg-gray-100">
      {/* Left section: Filters and event list */}
      <div className="w-9/12 p-4">
        <div className="flex flex-col items-center gap-4 bg-gray-100 min-h-screen">
          <div className="w-full max-w-4xl space-y-6">
            {events.length > 0 ? (
              events.map((event, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  {/* Image */}
                  <div className="w-full md:w-1/3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Event Info */}
                  <div className="flex flex-col justify-between p-6 space-y-4 w-full md:w-2/3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {event.title}
                      </h2>
                      <p className="text-gray-500 mt-2">{event.description}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-gray-700">
                        <span className="material-icons-outlined mr-2">
                          location_on
                        </span>
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="material-icons-outlined mr-2">
                          schedule
                        </span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span>Duration: {event.duration}</span>
                      </div>
                    </div>
                    <div>
                      <button
                        className={`px-6 py-2 rounded ${
                          attendedEvents.includes(event.title)
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        onClick={() =>
                          handleAttendNow(event.clubName, event.title)
                        }
                        disabled={attendedEvents.includes(event.title)}
                      >
                        {attendedEvents.includes(event.title)
                          ? "Attended"
                          : "Attend Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No events available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Right section: Event Summary & Promotion */}
      <div className="w-3/12 p-4">
        {/* Event Summary */}
        <div className="bg-white p-4 shadow-md rounded-2xl mb-6">
          <p className="font-bold text-lg mb-2">Popular Domains</p>
          <div className="w-full max-w-xs">
            <canvas id="popularDomainsChart"></canvas>
          </div>
        </div>

        {/* Promotion Section */}
        <div className="bg-white p-6 shadow-md rounded-2xl">
          <p className="font-bold text-lg">Promotion</p>
          <img
            src="https://via.placeholder.com/500x900"
            alt="Promotion"
            className="mt-4 w-full rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;