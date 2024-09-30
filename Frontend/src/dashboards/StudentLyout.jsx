import React from 'react';
import { Outlet } from 'react-router-dom';               // To render ClubDashboard or other pages dynamically
import StudentHeader from '../components/StudentHeader.jsx';
import StudentSideBar from '../components/StudentSidebar.jsx';

const StudentLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <aside>
        <StudentSideBar />  {/* Sidebar component */}
      </aside>

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar Section */}
        <header>
          <StudentHeader />  {/* Navbar component */}
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
