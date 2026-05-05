import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");

  // Filter states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [assignedSalesperson, setAssignedSalesperson] = useState("");

  // Convert status text into CSS class name
  const getStatusClass = (statusText) => {
    return statusText.toLowerCase().replace(/\s+/g, "-");
  };

  // Load leads from backend
  const loadLeads = async (customFilters = null) => {
    try {
      const filters = customFilters || {
        search,
        status,
        leadSource,
        assignedSalesperson,
      };

      const params = new URLSearchParams();

      if (filters.search) params.append("search", filters.search);
      if (filters.status) params.append("status", filters.status);
      if (filters.leadSource) params.append("leadSource", filters.leadSource);
      if (filters.assignedSalesperson) {
        params.append("assignedSalesperson", filters.assignedSalesperson);
      }

      const response = await API.get(`/leads?${params.toString()}`);
      setLeads(response.data);
    } catch (error) {
      setError("Failed to load leads");
    }
  };

  // Load all leads when page opens
  useEffect(() => {
    loadLeads({
      search: "",
      status: "",
      leadSource: "",
      assignedSalesperson: "",
    });
  }, []);

  // Apply filters
  const handleFilter = (e) => {
    e.preventDefault();
    loadLeads();
  };

  // Clear filters and reload all leads
  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setLeadSource("");
    setAssignedSalesperson("");

    loadLeads({
      search: "",
      status: "",
      leadSource: "",
      assignedSalesperson: "",
    });
  };

  // Delete a lead
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/leads/${id}`);
      loadLeads();
    } catch (error) {
      alert("Failed to delete lead");
    }
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <div className="page-header page-header-row">
          <div>
            <h1>Leads</h1>
            <p>Manage sales leads and pipeline status</p>
          </div>

          <Link className="primary-link" to="/leads/new">
            Create Lead
          </Link>
        </div>

        <form className="filter-card" onSubmit={handleFilter}>
          <input
            placeholder="Search name, company, or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          <select
            value={leadSource}
            onChange={(e) => setLeadSource(e.target.value)}
          >
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
            <option value="Cold Email">Cold Email</option>
            <option value="Event">Event</option>
            <option value="Other">Other</option>
          </select>

          <input
            placeholder="Salesperson"
            value={assignedSalesperson}
            onChange={(e) => setAssignedSalesperson(e.target.value)}
          />

          <button type="submit">Apply</button>

          <button type="button" className="secondary-button" onClick={clearFilters}>
            Clear
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Lead</th>
                <th>Company</th>
                <th>Email</th>
                <th>Source</th>
                <th>Salesperson</th>
                <th>Status</th>
                <th>Deal Value</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="8">No leads found</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.leadName}</td>
                    <td>{lead.companyName}</td>
                    <td>{lead.email}</td>
                    <td>{lead.leadSource}</td>
                    <td>{lead.assignedSalesperson}</td>
                    <td>
                      <span
                        className={`status-badge status-${getStatusClass(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td>Rs. {lead.estimatedDealValue}</td>
                    <td className="action-buttons">
                      <Link to={`/leads/${lead.id}`}>View</Link>
                      <Link to={`/leads/${lead.id}/edit`}>Edit</Link>
                      <button onClick={() => handleDelete(lead.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default Leads;