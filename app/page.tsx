import React from "react";
import Navbar from "../components/Navbar";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "100px", marginLeft: "220px", padding: "20px" }}>
        <h1>HR Dashboard</h1>
        <p>Welcome to your HR management dashboard.</p>
      </div>
    </div>
  );
};

export default Dashboard;
