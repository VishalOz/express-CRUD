import React, { useState } from 'react'

const App = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'Pass123!' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'SecurePass456' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', password: 'MyPass789!' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', password: 'SarahPass12' },
    { id: 5, name: 'David Brown', email: 'david@example.com', password: 'DavidSecure34' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', password: 'EmilyPass567' },
    { id: 7, name: 'Alex Miller', email: 'alex@example.com', password: 'AlexSecure89' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', password: 'LisaPass901!' },
    { id: 9, name: 'Robert Taylor', email: 'robert@example.com', password: 'RobertPass23' },
    { id: 10, name: 'Jennifer Lee', email: 'jennifer@example.com', password: 'JennySecure45' },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Users Management</h1>
          <p className="text-gray-600">A complete list of users with their credentials</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Password</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'
                    } hover:bg-indigo-100 transition-colors duration-200 border-b border-gray-200`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-indigo-600 font-medium">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{user.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-indigo-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total Users: <span className="font-semibold text-indigo-600">{users.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App