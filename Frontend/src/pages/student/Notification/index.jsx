import React from 'react'

const StudentNotification = () => {
  const events = [
    { id: 1, name: 'AWS Cloud ML Meet up 2.0', lastDate: '26-09-2024' },
    { id: 2, name: 'ODSC AIML Workshop', lastDate: '26-09-2024' },
    { id: 3, name: 'IBM Infrastructure Seminar', lastDate: '26-09-2024' },
  ];
  return (
    <>
    <div className='container bg-gray-100 mx-auto p-4 h-full'>
    <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left py-2">#</th>
              <th className="text-left py-2">Name</th>
              <th className="text-right py-2">Last Date of Registration</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id} className="border-t">
                <td className="py-4">{`0${index + 1}`}</td>
                <td className="py-4">{event.name}</td>
                <td className="py-4 text-right">{`Last Date of Registration : ${event.lastDate}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default StudentNotification;