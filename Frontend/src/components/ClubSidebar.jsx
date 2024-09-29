import { NavLink } from "react-router-dom";
import { 
  FaHome, 
  FaTrophy, 
  FaUsers, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaCog, 
  FaSignOutAlt 
} from 'react-icons/fa';

const ClubSideBar = () => {
  return (
    <nav className="w-64 bg-white text-[#737791] h-screen sticky top-0 p-4">
      <h1 className="text-3xl text-[#151D48] font-bold mt-5 mb-10">Club Sphere</h1>
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
          <NavLink
            to="/sign_out"
            className={({ isActive }) =>
              `flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 ${
                isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
              }`
            }
          >
            <FaSignOutAlt className="mr-2" /> Sign Out
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default ClubSideBar;
