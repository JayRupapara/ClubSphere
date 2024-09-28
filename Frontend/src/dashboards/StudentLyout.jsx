import React from 'react';
import ClubSidebar from '../components/StudentSidebar.jsx';  // Ensure the correct path to ClubSidebar
import ClubNavbar from '../components/StudentHeader.jsx';    // Ensure the correct path to ClubHeader
import { Outlet } from 'react-router-dom';               // To render ClubDashboard or other pages dynamically

const StudentLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <aside className="bg-gray-800 text-white">
        <ClubSidebar />  {/* Sidebar component */}
      </aside>

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar Section */}
        <header>
          <ClubNavbar />  {/* Navbar component */}
        </header>

        {/* Dashboard Content Section */}
        <main className="flex-1 overflow-auto">
          <Outlet />  {/* Dynamically renders the content like ClubDashboard */}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
