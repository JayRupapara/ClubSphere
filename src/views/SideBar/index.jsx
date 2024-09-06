import { NavLink } from "react-router-dom";
import { FaHome, FaTrophy, FaUsers, FaCalendarAlt, FaUserGraduate, FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';

const SideBar = () => {
  return (
    <nav className="w-64 bg-white text-[#737791] h-screen sticky top-0 p-4">
      {/* Title */}
      <h1 className="text-3xl text-[#151D48] font-bold mt-5 mb-10">Club Sphere</h1>

      {/* Navigation Links */}
      <ul className="space-y-2">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 ${
                isActive ? 'bg-black text-white' : ' hover:bg-gray-200'
              }`
            }
          >
            <FaHome className="mr-2" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 ${
                isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
              }`
            }
          >
            <FaTrophy className="mr-2" /> Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clubs"
            className={({ isActive }) =>
              `flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 ${
                isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
              }`
            }
          >
            <FaUsers className="mr-2" /> Clubs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
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
            to="/students"
            className={({ isActive }) =>
              `flex items-center py-3 px-6 rounded-2xl transition-colors duration-200 ${
                isActive ? 'bg-black text-white' : 'hover:bg-gray-200'
              }`
            }
          >
            <FaUserGraduate className="mr-2" /> Students
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/messages"
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
            to="/settings"
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
            to="/signout"
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

export default SideBar;
