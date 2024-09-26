import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">ClubSphere</Link>
        </div>

        {/* Right side - Home, Sign In and Sign Up */}
        <div className="flex items-center space-x-6">
          {/* Home Button */}
          <Link to="/" className="text-white font-medium">
            Home
          </Link>

          {/* Sign In Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSignInOpen(!isSignInOpen)}
              className="text-white font-medium"
            >
              Sign In
            </button>
            {isSignInOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Link
                  to="/signin-student"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setIsSignInOpen(false)}
                >
                  Sign In as Student
                </Link>
                <Link
                  to="/signin-club"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setIsSignInOpen(false)}
                >
                  Sign In as Club
                </Link>
                <Link
                  to="/signin-admin"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setIsSignInOpen(false)}
                >
                  Sign In as Admin
                </Link>
              </div>
            )}
          </div>

          {/* Sign Up Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSignUpOpen(!isSignUpOpen)}
              className="text-white font-medium"
            >
              Sign Up
            </button>
            {isSignUpOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Link
                  to="/signup-student"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setIsSignUpOpen(false)}
                >
                  Sign Up as Student
                </Link>
                <Link
                  to="/signup-club"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setIsSignUpOpen(false)}
                >
                  Sign Up as Club
                </Link>
                <Link
                  to="/signup-admin"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => setIsSignUpOpen(false)}
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
