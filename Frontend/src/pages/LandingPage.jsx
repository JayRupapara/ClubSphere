// LandingPage.jsx
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavbarLandingPage'; // Ensure the path is correct

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="gradient-bg min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-[80vh] bg-gradient-to-b from-gray-100 to-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
          Manage Your Clubs Effortlessly
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Your one-stop solution to organize, communicate, and thrive.
        </p>
        <div className="space-x-4">
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
            Learn More
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="h-[50vh] md:h-[60vh] flex items-center justify-center bg-white text-black"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            About ClubSphere
          </h3>
          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            ClubSphere is a management solution designed to help you organize
            your clubs and manage events effortlessly. 
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="h-[50vh] md:h-[60vh] bg-gray-100 text-black py-10"
      >
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-2xl font-semibold mb-4">Event Management</h4>
              <p className="text-gray-600">
                Plan and manage events easily with our intuitive interface.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-2xl font-semibold mb-4">Club Coordination</h4>
              <p className="text-gray-600">
                Coordinate between different clubs effortlessly.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
        className="h-[50vh] md:h-[60vh] bg-white text-black py-10"
      >
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <p className="text-gray-700 mb-4">
                &quot;ClubSphere has transformed how we manage our club activities.
                The interface is user-friendly and intuitive.&quot;
              </p>
              <h4 className="text-xl font-semibold">- John Doe, Club Member</h4>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
      </section>

      {/* Contact Us Section */}
      <section
        id="contact"
        className="h-[50vh] md:h-[60vh] bg-gray-50 text-black py-10"
      >
        <div className="max-w-6xl mx-auto text-center px-6">
          <h3 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
            Get in Touch
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Have questions? Reach out to us, and we&apos;ll be happy to help.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300">
            Contact Us
          </button>
        </div>
      </section>
      <footer className="bg-gray-900 text-gray-200 py-10">
  <div className="container mx-auto">
    <div className="text-center">
      <p className="text-gray-400">&copy; 2024 ClubSphere. All Rights Reserved.</p>
    </div>
  </div>
</footer>

    </div>
  );
};

export default LandingPage;
