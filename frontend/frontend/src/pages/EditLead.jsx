import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LeadForm from "../components/LeadForm";
import API from "../api/api";

function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [error, setError] = useState("");

  const loadLead = async () => {
    try {
      const response = await API.get(`/leads/${id}`);
      setLead(response.data);
    } catch (error) {
      setError("Failed to load lead");
    }
  };

  useEffect(() => {
    loadLead();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await API.put(`/leads/${id}`, formData);
      navigate(`/leads/${id}`);
    } catch (error) {
      setError("Failed to update lead");
    }
  };

  return (
    <>
      <Navbar />

      <main className="container narrow-container">
        <div className="page-header">
          <h1>Edit Lead</h1>
          <p>Update sales lead information</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        {!lead ? (
          <p className="loading">Loading lead...</p>
        ) : (
          <LeadForm
            initialValues={lead}
            onSubmit={handleUpdate}
            submitLabel="Update Lead"
          />
        )}
      </main>
    </>
  );
}

export default EditLead;