"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type Employee = {
  id: number;
  fullName: string;
  age: number;
  status: string;
  email: string;
  gender: string;
  phoneNumber: string;
  salary: number | null;
  department: string;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function EmployeesTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError("");

      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No token found. Please login.");

        const response = await axios.get(`http://localhost:3001/hr/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployees(response.data);
      } catch (err: any) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch employees"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (employees.length === 0)
    return <p className="text-center mt-4">No employees found.</p>;

  return (
    <div className="overflow-x-auto mt-6 ml-63 mr-5">
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Full Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Age</th>
            <th className="py-2 px-4 border">Gender</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Department</th>
            <th className="py-2 px-4 border">Salary</th>
            <th className="py-2 px-4 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="text-center">
              <td className="py-2 px-4 border">{emp.id}</td>
              <td className="py-2 px-4 border">{emp.fullName}</td>
              <td className="py-2 px-4 border">{emp.email}</td>
              <td className="py-2 px-4 border">{emp.phoneNumber}</td>
              <td className="py-2 px-4 border">{emp.age}</td>
              <td className="py-2 px-4 border">{emp.gender}</td>
              <td className="py-2 px-4 border">{emp.status}</td>
              <td className="py-2 px-4 border">{emp.department}</td>
              <td className="py-2 px-4 border">{emp.salary ?? "-"}</td>
              <td className="py-2 px-4 border">
                {new Date(emp.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
