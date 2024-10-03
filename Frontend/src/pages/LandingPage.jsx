// LandingPage.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarLandingPage"; // Ensure the path is correct
import img1 from "../assets/laptopScreen.png"; // Ensure the path is correct
import img2 from "../assets/laptopScreen2.png"; // Ensure the path is correct


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-gray-300 to-white h-screen pt-10">
      <Navbar />

{/* Hero Section */}
<section className="flex items-center w-5/6 mx-auto justify-between pt-40">
  {/* Right Side: Dashboard Images */}
  <div className="relative flex-shrink-0 w-4/12">
    {/* First Image (Top-Right) */}
    <img 
      src={img1} 
      alt="Dashboard 1" 
      className="relative right-10 top-[-10rem]"
    />
    {/* Second Image (Bottom-Left) */}
    <img 
      src={img2} 
      alt="Dashboard 2 " 
      className="absolute left-24 top-[5rem]"
    />
  </div>
    {/* Left Side: Text */}
    <div className="flex flex-col justify-center w-7/12 ">
    <h2 className="text-3xl md:text-6xl font-bold mb-4">
      Manage Your Clubs Effortlessly
    </h2>
    <p className="text-lg md:text-xl text-gray-700 mb-8">
      Your one-stop solution to organize, communicate, and thrive.
    </p>
    <div className="space-x-4">
      <button className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800">
        Learn More
      </button>
    </div>
  </div>
</section>

      {/* About Section */}
      <section
        id="about"
        className="flex items-center justify-center bg-white text-black bg-gradient-to-t from-gray-300 to-white py-24"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            About ClubSphere
          </h3>
          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            ClubSphere is a management solution designed to help you organize
            your clubs and manage events effortlessly.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-300">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-gray-100 text-black py-24 bg-gradient-to-b from-gray-300 to-white"
      >
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-10">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-2xl font-semibold mb-4">Event Management</h4>
              <p className="text-gray-600">
                Plan and manage events easily with our intuitive interface.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-2xl font-semibold mb-4">Club Coordination</h4>
              <p className="text-gray-600">
                Coordinate between different clubs effortlessly.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-2xl font-semibold mb-4">Notifications</h4>
              <p className="text-gray-600">
                Send and receive notifications to keep everyone informed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="bg-white text-black pt-24  bg-gradient-to-t from-gray-300 to-white py-24"
      >
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-10">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <p className="text-gray-700 mb-4">
                &quot;ClubSphere has transformed how we manage our club
                activities. The interface is user-friendly and intuitive.&quot;
              </p>
              <h4 className="text-xl font-semibold">- John Doe, Club Member</h4>
            </div>
            <div className="p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <p className="text-gray-700 mb-4">
                &quot;Thanks to ClubSphere, our events are better organized and
                communication has never been easier.&quot;
              </p>
              <h4 className="text-xl font-semibold">
                - Jane Smith, Club President
              </h4>
            </div>
          </div>
        </div>

        {/* Transition to Contact Section */}
        <div className="text-center">
          <p className="text-lg text-gray-600 py-5">
            Interested in learning more? We&apos;re here to help!
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-300">
            <a href="">Contact Us</a>
          </button>
        </div>
      </section>
      <footer className="bg-gray-900 text-gray-200 py-10">
        <div className="container mx-auto">
          <div className="text-center">
            <p className="text-gray-300">
              &copy; 2024 ClubSphere. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
