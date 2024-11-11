import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggles the dropdown, closes the other one
  const handleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Toggle for mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close any open dropdowns when the mobile menu opens/closes
    setOpenDropdown(null);
  };

  return (
    <nav className="bg-white shadow-lg mx-auto w-full md:w-4/5 rounded-xl px-4 md:px-6 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-black text-2xl font-bold">
          <Link to="/">ClubSphere</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Right Side Menu - Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link 
            to="/" 
            className="text-black font-medium px-4 py-2 rounded-xl hover:bg-black hover:text-white transition duration-300"
          >
            Home
          </Link>

          {/* Sign In Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdown('signIn')}
              className="text-black font-medium px-4 py-2 rounded-xl hover:bg-black hover:text-white transition duration-300"
            >
              Sign In
            </button>
            {openDropdown === 'signIn' && (
              <div className="absolute md:right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1">
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
              className="text-black font-medium px-4 py-2 rounded-xl hover:bg-black hover:text-white transition duration-300"
            >
              Sign Up
            </button>
            {openDropdown === 'signUp' && (
              <div className="absolute md:right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1">
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

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-50">
          <button
            className="absolute top-4 right-4 text-black focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Items */}
          <Link 
            to="/" 
            className="text-black font-medium px-4 py-2 rounded-xl hover:bg-black hover:text-white transition duration-300 my-2"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>

          {/* Sign In Button for Mobile */}
          <button
            onClick={() => handleDropdown('signIn')}
            className="text-black font-medium px-4 py-2 rounded-xl hover:bg-black hover:text-white transition duration-300 my-2"
          >
            Sign In
          </button>
          {openDropdown === 'signIn' && (
            <div className="mt-2 w-48 bg-white rounded-xl shadow-lg py-1">
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

          {/* Sign Up Button for Mobile */}
          <button
            onClick={() => handleDropdown('signUp')}
            className="text-black font-medium px-4 py-2 rounded-xl hover:bg-black hover:text-white transition duration-300 my-2"
          >
            Sign Up
          </button>
          {openDropdown === 'signUp' && (
            <div className="mt-2 w-48 bg-white rounded-xl shadow-lg py-1">
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
      )}
    </nav>
  );
}

export default Navbar;