import { useState } from "react";
import "./JobProfileForm.css";
import { useNavigate } from "react-router-dom";
import Api from "../../Api";

const JobProfileForm = () => {
  const [inputData, setInputData] = useState({
    companyName: "",
    jobRole: "",
    salary: "",
    jobUrl: "",
    interviewDate: "",
    location: "",
    status: "",
    attachment: null,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setInputData({
      ...inputData,
      attachment: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(); formData.append('attachment', inputData.attachment);
   
    try {
      await Api.createJobProfile(inputData);
      alert("Job created successfully!");

      navigate("/myjobs");

    } catch (error) {
      alert(`Failed to create job: ${error.message}`);
    }
  };

  const navigate = useNavigate(); // Hook for navigation

  
  const handleCancel = () => {
    navigate("/myjobs");
  };

  

  return (
    <div className="job-profile-form-container">
      <form className="job-profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Create a Job Profile</h2>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={inputData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Job Role</label>
          <input
            type="text"
            name="jobRole"
            value={inputData.jobRole}
            onChange={handleChange}
            placeholder="Job Role"
            required
          />
        </div>

        <div className="form-group">
          <label>Salary</label>
          <input
            type="text"
            name="salary"
            value={inputData.salary}
            onChange={handleChange}
            placeholder="Salary"
          />
        </div>

        <div className="form-group">
          <label>Job URL</label>
          <input
            type="url"
            name="jobUrl"
            value={inputData.jobUrl}
            onChange={handleChange}
            placeholder="Job URL"
          />
        </div>

        <div className="form-group">
          <label>Interview Date</label>
          <input
            type="date"
            name="interviewDate"
            value={inputData.interviewDate.split('T')[0]} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={inputData.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={inputData.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        <div className="form-group">
          <label>Attachment</label>
          <input type="file" name="attachment" onChange={handleFileChange} accept=".pdf"/>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={inputData.notes}
            onChange={handleChange}
            placeholder="Notes"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-create" >
            Create
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobProfileForm;
