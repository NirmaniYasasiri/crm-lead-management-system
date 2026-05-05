import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  // Load dashboard statistics from backend
  const loadStats = async () => {
    try {
      const response = await API.get("/dashboard");
      setStats(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setError("Failed to load dashboard data");
    }
  };

  // Run once when dashboard page opens
  useEffect(() => {
    loadStats();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Overview of sales lead performance</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        {!stats ? (
          <p className="loading">Loading dashboard...</p>
        ) : (
          <div className="dashboard-grid">
            <div className="stat-card">
              <h3>Total Leads</h3>
              <p>{stats.totalLeads}</p>
            </div>

            <div className="stat-card">
              <h3>New Leads</h3>
              <p>{stats.newLeads}</p>
            </div>

            <div className="stat-card">
              <h3>Qualified Leads</h3>
              <p>{stats.qualifiedLeads}</p>
            </div>

            <div className="stat-card">
              <h3>Won Leads</h3>
              <p>{stats.wonLeads}</p>
            </div>

            <div className="stat-card">
              <h3>Lost Leads</h3>
              <p>{stats.lostLeads}</p>
            </div>

            <div className="stat-card">
              <h3>Total Estimated Value</h3>
              <p>Rs. {stats.totalEstimatedDealValue}</p>
            </div>

            <div className="stat-card">
              <h3>Total Won Value</h3>
              <p>Rs. {stats.totalWonDealValue}</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Dashboard;