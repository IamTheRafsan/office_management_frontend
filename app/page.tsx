// pages/index.js
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">HR Dashboard</h1>
        <div className="space-x-4">
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            Add Employee
          </button>
          <button className="px-3 py-1 bg-gray-200 rounded">Logout</button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">Total Employees</h2>
            <p className="text-2xl font-bold mt-2">152</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">On Leave</h2>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">New Hires</h2>
            <p className="text-2xl font-bold mt-2">5</p>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Employees</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Department</th>
                <th className="border-b p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Rafsan Yasir</td>
                <td className="p-2">IT</td>
                <td className="p-2 text-green-600 font-medium">Active</td>
              </tr>
              <tr>
                <td className="p-2">Aisha Rahman</td>
                <td className="p-2">HR</td>
                <td className="p-2 text-yellow-600 font-medium">On Leave</td>
              </tr>
              <tr>
                <td className="p-2">Tanvir Ahmed</td>
                <td className="p-2">Finance</td>
                <td className="p-2 text-green-600 font-medium">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
