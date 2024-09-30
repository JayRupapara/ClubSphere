import React from 'react';
import { Outlet } from 'react-router-dom';               // To render ClubDashboard or other pages dynamically
import AdminSideBar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <aside>
        <AdminSideBar />  {/* Sidebar component */}
      </aside>

      {/* Main Content Section */}
      <div className="flex-1 flex flex-col">
        {/* Navbar Section */}
        <header>
          <AdminHeader />  {/* Navbar component */}
        </header>

        {/* Dashboard Content Section */}
        <main className="flex-1 overflow-auto">
          <Outlet />  {/* Dynamically renders the content like ClubDashboard */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
