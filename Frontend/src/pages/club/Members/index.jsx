import React, { useState, useEffect } from "react";
import axios from "axios";

const ClubMembers = () => {
  const [members, setMembers] = useState([]); // State to store members fetched from the API
  const [editingRow, setEditingRow] = useState(null); // Track the editing row index
  const [positions, setPositions] = useState({}); // Store dynamic positions based on members' default roles

  // Fetch members from the API on component mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Retrieve JWT token from localStorage
        const token = localStorage.getItem("token");

        // Make an API request with Authorization header
        const response = await axios.get("http://localhost:3000/api/club/members", {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token for API request
          },
        });

        const fetchedMembers = response.data.members || []; // Get members list from response

        // Initialize default positions for members (optional, based on logic)
        const initialPositions = {};
        fetchedMembers.forEach((_, index) => {
          initialPositions[index] = "Attendee"; // Default value, adjust based on logic if needed
        });

        // Update state with fetched members and positions
        setMembers(fetchedMembers);
        setPositions(initialPositions);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Function to open the dropdown for editing a member's role
  const handleEditClick = (index) => {
    setEditingRow(index); // Set the current editing row index
  };

  // Function to change the position/role for a member
  const handlePositionChange = (index, newPosition) => {
    const updatedPositions = { ...positions, [index]: newPosition }; // Update positions state
    setPositions(updatedPositions);
    setEditingRow(null); // Close dropdown after selection
  };

  return (
    <div className="container bg-gray-100 mx-auto p-4">
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-gray-600 uppercase text-sm leading-normal border-b">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Mail Id</th>
              <th className="py-3 px-6 text-left">Join Date</th>
              <th className="py-3 px-6 text-left">Position</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {members.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">
                  No Members Found
                </td>
              </tr>
            ) : (
              members.map((member, index) => (
                <tr key={member.email} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                  <td className="py-3 px-6 text-left">
                    {member.first_name} {member.last_name}
                  </td>
                  <td className="py-3 px-6 text-left">{member.email}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(member.join_date).toLocaleDateString()} {/* Format join date */}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {editingRow === index ? (
                      <select
                        className="border rounded px-2 py-1 text-sm"
                        value={positions[index]}
                        onChange={(e) => handlePositionChange(index, e.target.value)}
                      >
                        <option value="Attendee">Attendee</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Coordinator">Coordinator</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1 text-sm rounded-full ${
                          positions[index] === "Attendee"
                            ? "text-purple-600 bg-purple-100"
                            : positions[index] === "Volunteer"
                            ? "text-green-600 bg-green-100"
                            : "text-blue-600 bg-blue-100"
                        }`}
                      >
                        {positions[index]}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="py-1 px-3 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                      onClick={() => handleEditClick(index)}
                    >
                      {editingRow === index ? "Save" : "Edit"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClubMembers;