import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggles the dropdown, closes the other one
  const handleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-white shadow-lg mx-auto w-4/5 rounded-xl px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-black text-2xl font-bold">
          <Link to="/">ClubSphere</Link>
        </div>

        {/* Right side - Home, Sign In and Sign Up */}
        <div className="flex items-center space-x-6">
          {/* Home Button */}
          <Link 
            to="/" 
            className="text-black font-medium px-4 py-2 rounded-xl  hover:bg-black hover:text-white transition duration-300"
          >
            Home
          </Link>

          {/* Sign In Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdown('signIn')}
              className="text-black font-medium px-4 py-2 rounded-xl  hover:bg-black hover:text-white transition duration-300"
            >
              Sign In
            </button>
            {openDropdown === 'signIn' && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl md shadow-lg py-1">
                <Link
                  to="/signin-student"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenDropdown(null)}
                >
                  Sign In as Student
                </Link>
                <Link
                  to="/signin-club"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenDropdown(null)}
                >
                  Sign In as Club
                </Link>
                <Link
                  to="/signin-admin"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenDropdown(null)}
                >
                  Sign In as Admin
                </Link>
              </div>
            )}
          </div>

          {/* Sign Up Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdown('signUp')}
              className="text-black font-medium px-4 py-2 rounded-xl  hover:bg-black hover:text-white transition duration-300"
            >
              Sign Up
            </button>
            {openDropdown === 'signUp' && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl -md shadow-lg py-1">
                <Link
                  to="/signup-student"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenDropdown(null)}
                >
                  Sign Up as Student
                </Link>
                <Link
                  to="/signup-club"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenDropdown(null)}
                >
                  Sign Up as Club
                </Link>
                <Link
                  to="/signup-admin"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setOpenDropdown(null)}
                >
                  Sign Up as Admin
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
