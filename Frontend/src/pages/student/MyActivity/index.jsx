import React from 'react'

const StudentMyActivity = () => {
  const clubs = [
    { id: 1, name: 'AWS Cloud Club' },
    { id: 2, name: 'AWS Cloud Club' },
    { id: 3, name: 'AWS Cloud Club' },
    { id: 4, name: 'AWS Cloud Club' },
    { id: 5, name: 'AWS Cloud Club' },
    { id: 6, name: 'AWS Cloud Club' },
    { id: 7, name: 'AWS Cloud Club' },
  ];  
  return (
    <div className="container bg-gray-100 mx-auto p-4">
      <div className="bg-white p-4 mb-4 rounded-lg shadow-sm">
      <h1 className='text-lg font-bold'>Select Time Slots</h1>
       <div className="p-4 bg-white flex justify-start gap-4">
        <button className="bg-orange-200 text-orange-600 px-6 py-2 rounded-lg font-semibold">My Joined Clubs</button>
        <button className="bg-green-200 text-green-600 px-6 py-2 rounded-lg font-semibold">Attended Events History</button>
      </div>
      </div>

      {/* Joined Clubs Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="font-semibold text-lg mb-4">Joined Clubs</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left py-2">#</th>
              <th className="text-left py-2">Name</th>
              <th className="text-right py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, index) => (
              <tr key={club.id} className="border-t">
                <td className="py-2">{`0${index + 1}`}</td>
                <td className="py-2">{club.name}</td>
                <td className="py-2 text-right">
                  <button className="bg-white border border-gray-400 px-4 py-2 rounded-lg">Unsubscribe</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> 
  )
}

export default StudentMyActivity