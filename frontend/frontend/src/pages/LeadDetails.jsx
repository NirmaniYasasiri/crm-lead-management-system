import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";

function LeadDetails() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState("");

  const loadLead = async () => {
    try {
      const response = await API.get(`/leads/${id}`);
      setLead(response.data);
    } catch (error) {
      setError("Failed to load lead details");
    }
  };

  useEffect(() => {
    loadLead();
  }, [id]);

  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!noteContent.trim()) {
      return;
    }

    try {
      await API.post(`/leads/${id}/notes`, {
        content: noteContent,
      });

      setNoteContent("");
      loadLead();
    } catch (error) {
      alert("Failed to add note");
    }
  };

  if (error) {
    return (
      <>
        <Navbar />
        <p className="error-message">{error}</p>
      </>
    );
  }

  if (!lead) {
    return (
      <>
        <Navbar />
        <p className="loading">Loading lead details...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <div className="page-header page-header-row">
          <div>
            <h1>{lead.leadName}</h1>
            <p>{lead.companyName}</p>
          </div>

          <Link className="primary-link" to={`/leads/${lead.id}/edit`}>
            Edit Lead
          </Link>
        </div>

        <div className="details-card">
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phone}</p>
          <p><strong>Lead Source:</strong> {lead.leadSource}</p>
          <p><strong>Assigned Salesperson:</strong> {lead.assignedSalesperson}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`status-badge status-${lead.status.replaceAll(" ", "-").toLowerCase()}`}>
              {lead.status}
            </span>
          </p>
          <p><strong>Estimated Deal Value:</strong> Rs. {lead.estimatedDealValue}</p>
          <p><strong>Created Date:</strong> {new Date(lead.createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(lead.updatedAt).toLocaleString()}</p>
        </div>

        <section className="notes-section">
          <h2>Lead Notes</h2>

          <form className="note-form" onSubmit={handleAddNote}>
            <textarea
              placeholder="Add note after call, email, meeting, or follow-up..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>

            <button type="submit">Add Note</button>
          </form>

          <div className="notes-list">
            {lead.notes && lead.notes.length > 0 ? (
              lead.notes.map((note) => (
                <div className="note-card" key={note.id}>
                  <p>{note.content}</p>
                  <small>
                    Created by {note.createdBy} on{" "}
                    {new Date(note.createdAt).toLocaleString()}
                  </small>
                </div>
              ))
            ) : (
              <p>No notes added yet.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default LeadDetails;