import { Chart } from "chart.js";
import React, { useEffect, useRef, useState } from "react";

const StudentHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "AWS Cloud Infrastructure Camp",
      description:
        "About AWS Cloud Infrastructure Camp events and more details",
      venue: "DEPSTAR, Seminar Hall (329)",
      time: "10:30 AM",
      duration: "2 Hours",
      participants: 67,
      image: "https://via.placeholder.com/500",
      rating: 5,
    },
  ]);

  // States for new event form inputs
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    venue: "",
    time: "",
    duration: "",
    participants: "",
    image: "",
  });

  const popularDomainsChartRef = useRef(null);
  // Open Modal
  const handleAddEvent = () => {
    setShowModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle input change for the new event form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
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

    // Handle the form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newEvent.title && newEvent.venue && newEvent.time) {
        setEvents([...events, newEvent]); // Add new event to the list
        setShowModal(false); // Close the modal after submission
        setNewEvent({
          title: "",
          description: "",
          venue: "",
          time: "",
          duration: "",
          participants: "",
          image: "",
        }); // Reset the form
      }
    };

    return () => {
      if (popularDomainsChartRef.current)
        popularDomainsChartRef.current.destroy();
    };
  }, []);

  return (
    <div className="flex justify-between bg-gray-100">
      {/* Left section: Filters and event list */}
      <div className="w-9/12 p-4">
        {/* Apply Filters Section */}
        <div className="flex flex-col items-center gap-4 bg-gray-100 min-h-screen">
          {/* Cloud Camp Cards */}
          <div className="w-full max-w-4xl space-y-6">
            {/* Card */}
            {[1, 2].map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Image */}
                <div className="w-full md:w-1/3">
                  <img
                    src="https://your-image-url-here.com/aws-reinvent.png"
                    alt="AWS re:Invent"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Event Info */}
                <div className="flex flex-col justify-between p-6 space-y-4 w-full md:w-2/3">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      AWS Cloud Infrastructure Camp
                    </h2>
                    <p className="text-gray-500 mt-2">
                      About AWS Cloud Infrastructure Camp events and more
                      details
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center text-gray-700">
                      <span className="material-icons-outlined mr-2">
                        location_on
                      </span>
                      <span>DEPSTAR, Seminar Hall (329)</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="material-icons-outlined mr-2">
                        schedule
                      </span>
                      <span>25-09-2024 | 10:30 AM</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="material-icons-outlined mr-2">
                        hourglass_empty
                      </span>
                      <span>Duration: 2 Hours</span>
                    </div>
                  </div>
                  <div>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Attend Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
