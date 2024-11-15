import axios from "axios";
import { Chart } from "chart.js";
import React, { useEffect, useRef, useState } from "react";

const Spinner = () => (
  /* From Uiverse.io by bociKond */
  <div class="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const StudentHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const popularDomainsChartRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/student/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const formattedEvents = response.data.map((event) => ({
          title: event.event_name,
          description: event.description,
          venue: event.venue,
          time: `${event.event_date.split("T")[0]} | ${event.event_start_time}`,
          duration: `${parseFloat(event.duration).toFixed(2)} Hours`,
          participants: "N/A",
          image: event.event_banner,
          clubName: event.club_name,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleAttendNow = async (clubName, eventName) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/student/attendnow",
        { club_name: clubName, event_name: eventName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendedEvents((prev) => [...prev, eventName]);
      console.log("Event attendance successful:", response.data);
    } catch (error) {
      console.error("Error attending event:", error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

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
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
      <div className="w-9/12 p-4">
        <div className="flex flex-col items-center gap-4 bg-gray-100 min-h-screen">
          <div className="w-full max-w-4xl space-y-6">
            {events.length > 0 ? (
              events.map((event, idx) => (
                <div key={idx} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="w-full md:w-1/3">
                    <img src={event.image} alt={event.title} className="object-fill w-full h-full" />
                  </div>
                  <div className="flex flex-col justify-between p-6 space-y-4 w-full md:w-2/3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                      <p className="text-gray-500 mt-2">{event.description}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-gray-700">
                        <span className="material-icons-outlined mr-2">Location : </span>
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="material-icons-outlined mr-2">Schedule :</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span>Duration : {event.duration}</span>
                      </div>
                    </div>
                    <div>
                      <button
                        className={`px-6 py-2 rounded ${attendedEvents.includes(event.title)
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        onClick={() => handleAttendNow(event.clubName, event.title)}
                        disabled={attendedEvents.includes(event.title)}
                      >
                        {attendedEvents.includes(event.title) ? "Attended" : "Attend Now"}
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
      <div className="w-3/12 p-4">
        <div className="bg-white p-4 shadow-md rounded-2xl mb-6">
          <p className="font-bold text-lg mb-2">Popular Domains</p>
          <div className="w-full max-w-xs">
            <canvas id="popularDomainsChart"></canvas>
          </div>
        </div>
        <div className="bg-white p-6 shadow-md rounded-2xl">
          <p className="font-bold text-lg">Promotion</p>
          <img src="https://pbs.twimg.com/media/FXCa47KacAAqVsv.jpg" alt="Promotion" className="mt-4 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;