import React, { useState } from "react";

const ClubMembers = () => {
  // State to keep track of the editing row and selected position
  const [editingRow, setEditingRow] = useState(null);
  const [positions, setPositions] = useState(
    Array(10).fill("Attendee") // Initialize positions with default values
  );

  // Handler to open the dropdown
  const handleEditClick = (index) => {
    setEditingRow(index);
  };

  // Handler to change the position
  const handlePositionChange = (index, newPosition) => {
    const updatedPositions = [...positions];
    updatedPositions[index] = newPosition;
    setPositions(updatedPositions);
    setEditingRow(null); // Close the dropdown after selection
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
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">01</td>
                <td className="py-3 px-6 text-left">Jeel</td>
                <td className="py-3 px-6 text-left">
                  d23dcel67@charusat.edu.in
                </td>
                <td className="py-3 px-6 text-left">24/09/2024</td>
                <td className="py-3 px-6 text-left">
                  {editingRow === index ? (
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={positions[index]}
                      onChange={(e) =>
                        handlePositionChange(index, e.target.value)
                      }
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClubMembers;
