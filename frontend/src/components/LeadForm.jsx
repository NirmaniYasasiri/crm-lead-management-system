import { useEffect, useState } from "react";

// Default empty form values.
// This is used when creating a new lead.
const defaultForm = {
  leadName: "",
  companyName: "",
  email: "",
  phone: "",
  leadSource: "Website",
  assignedSalesperson: "",
  status: "New",
  estimatedDealValue: "",
};

// This form is reusable.
// It is used for both Create Lead and Edit Lead pages.
function LeadForm({ initialValues, onSubmit, submitLabel }) {
  const [formData, setFormData] = useState(defaultForm);

  // If initialValues are passed, it means this form is used for editing.
  // So we load existing lead data into the form.
  useEffect(() => {
    if (initialValues) {
      setFormData({
        leadName: initialValues.leadName || "",
        companyName: initialValues.companyName || "",
        email: initialValues.email || "",
        phone: initialValues.phone || "",
        leadSource: initialValues.leadSource || "Website",
        assignedSalesperson: initialValues.assignedSalesperson || "",
        status: initialValues.status || "New",
        estimatedDealValue: initialValues.estimatedDealValue || "",
      });
    }
  }, [initialValues]);

  // This function updates form data when user types
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // This function sends form data to the parent page
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <label>Lead Name</label>
      <input
        name="leadName"
        value={formData.leadName}
        onChange={handleChange}
        required
      />

      <label>Company Name</label>
      <input
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        required
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Phone Number</label>
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <label>Lead Source</label>
      <select
        name="leadSource"
        value={formData.leadSource}
        onChange={handleChange}
      >
        <option value="Website">Website</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Referral">Referral</option>
        <option value="Cold Email">Cold Email</option>
        <option value="Event">Event</option>
        <option value="Other">Other</option>
      </select>

      <label>Assigned Salesperson</label>
      <input
        name="assignedSalesperson"
        value={formData.assignedSalesperson}
        onChange={handleChange}
        required
      />

      <label>Status</label>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>

      <label>Estimated Deal Value</label>
      <input
        type="number"
        name="estimatedDealValue"
        value={formData.estimatedDealValue}
        onChange={handleChange}
        required
      />

      <button type="submit">{submitLabel}</button>
    </form>
  );
}

export default LeadForm;