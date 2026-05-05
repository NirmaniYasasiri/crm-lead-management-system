import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LeadForm from "../components/LeadForm";
import API from "../api/api";

function CreateLead() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Create new lead by sending form data to backend
  const handleCreate = async (formData) => {
    try {
      await API.post("/leads", formData);

      // After successful create, go back to leads list
      navigate("/leads");
    } catch (error) {
      setError("Failed to create lead");
    }
  };

  return (
    <>
      <Navbar />

      <main className="container narrow-container">
        <div className="page-header">
          <h1>Create Lead</h1>
          <p>Add a new sales lead to the CRM</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <LeadForm onSubmit={handleCreate} submitLabel="Create Lead" />
      </main>
    </>
  );
}

export default CreateLead;