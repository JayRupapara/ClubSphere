import React from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';


const AdminHeader = () => {
  return (
    <header className="sticky top-0 flex h-fit justify-between bg-white p-6">
      <h1 className="w-4/12 text-2xl font-bold">
        <Routes>
          <Route path="/" element={"Home"}></Route>
          <Route path="/Leaderboard" element={"Leaderboard"}></Route>
          <Route path="/Clubs" element={"Clubs"}></Route>
          <Route path="/Students" element={"Students"}></Route>
          <Route path="/Events" element={"Events"}></Route>
          <Route path="/Messages" element={"Messages"}></Route>
          <Route path="/Settings" element={"Settings"}></Route>
          <Route path="*" element={"logout"}></Route>
        </Routes>
      </h1>
      <div className="flex justify-center items-center gap-4 search-bar w-4/12">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search here..."
          className="w-full rounded-lg bg-[#F9FAFB] p-2 px-4 opacity-85"
        />
      </div>
      <div className="flex w-4/12 gap-4 items-center justify-center">
        <i className="fa-regular fa-bell"></i>
        <div className="flex items-center justify-center">
          <img
            className="h-10 mx-1 rounded-lg"
            src="https://media.licdn.com/dms/image/v2/D5603AQH5Cs-BkrXJIw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1709876697797?e=1729123200&v=beta&t=B5C-KZpwXrlxoS9_EbJSwl-G7pnsaVqL05CVg3cqoJE"
            alt="te"
          />
          <div className="mx-2">
            <p>Jeel Patel</p>
            <p className="text-xs opacity-50">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;