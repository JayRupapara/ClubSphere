import { NavLink } from "react-router-dom";
import { 
  FaHome, 
  FaUsers, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaCog, 
  FaSignOutAlt 
} from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClubSideBar = () => {
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const navigate = useNavigate();

  const handleSignOutClick = (e) => {
    e.preventDefault(); // Prevent default behavior of the link
    setShowModal(true); // Show modal
  };

  const confirmSignOut = () => {
    setShowModal(false); // Hide modal
    navigate('/'); // Navigate to the landing page ("/")
  };

  const cancelSignOut = () => {
    setShowModal(false); // Hide modal without sign-out
  };

  return (
    <div>
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-white h-screen sticky top-0 p-4">
        <h1 className="text-3xl font-bold mt-5 mb-10">Club Sphere</h1>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/club_dashboard"
              end
              className={({ isActive }) =>
                `flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 ${
                  isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
                }`
              }
            >
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/club_dashboard/members"
              className={({ isActive }) =>
                `flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 ${
                  isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
                }`
              }
            >
              <FaUsers className="mr-2" /> Members
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/club_dashboard/events"
              className={({ isActive }) =>
                `flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 ${
                  isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
                }`
              }
            >
              <FaCalendarAlt className="mr-2" /> Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/club_dashboard/messages"
              className={({ isActive }) =>
                `flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 ${
                  isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
                }`
              }
            >
              <FaEnvelope className="mr-2" /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/club_dashboard/settings"
              className={({ isActive }) =>
                `flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 ${
                  isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
                }`
              }
            >
              <FaCog className="mr-2" /> Settings
            </NavLink>
          </li>
          <li>
            {/* Trigger Sign Out Modal */}
            <a
              href="#"
              onClick={handleSignOutClick} // Show modal on click
              className="flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 hover:bg-gray-200"
            >
              <FaSignOutAlt className="mr-2" /> Sign Out
            </a>
          </li>
        </ul>
      </nav>

      {/* Modal for Sign-Out Confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to sign out?</h2>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={confirmSignOut}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={cancelSignOut}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubSideBar;
