import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api";
import "./UpdateJobProfileForm.css";

const UpdateJobProfileForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
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

  const [loading, setLoading] = useState(true);

  // Fetch job details from the API
  const fetchJobDetails = async () => {
    try {
      const data = await api.getMyJobsDetails(id);
      const jobDetails = data[0];
      setJobData({
        companyName: jobDetails.companyName || "",
        jobRole: jobDetails.jobRole || "",
        salary: jobDetails.salary || "",
        jobUrl: jobDetails.jobUrl || "",
        interviewDate: jobDetails.interviewDate || "",
        location: jobDetails.location || "",
        status: jobDetails.status || "",
        attachment: null,
        notes: jobDetails.notes || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setJobData({
      ...jobData,
      attachment: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobDataToSend = {
      companyName: jobData.companyName,
      jobRole: jobData.jobRole,
      salary: jobData.salary,
      jobUrl: jobData.jobUrl,
      interviewDate: jobData.interviewDate,
      location: jobData.location,
      status: jobData.status,
      notes: jobData.notes,
    };

    try {
     await api.updateJob(id, jobDataToSend);
      navigate("/myjobs"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update job. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(`/myjob/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-job-profile-form-container">
      <form className="update-job-profile-form" onSubmit={handleSubmit}>
        <h2>Update Job Profile</h2>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={jobData.companyName}
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
            value={jobData.jobRole}
            onChange={handleChange}
            placeholder="Job Role"
            required
          />
        </div>

        <div className="form-group">
          <label>Salary Range</label>
          <input
            type="text"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            placeholder="Salary Range"
          />
        </div>

        <div className="form-group">
          <label>Job URL</label>
          <input
            type="url"
            name="jobUrl"
            value={jobData.jobUrl}
            onChange={handleChange}
            placeholder="Job URL"
          />
        </div>

        <div className="form-group">
          <label>Interview Date</label>
          <input
            type="date"
            name="interviewDate"
            value={jobData.interviewDate.split("T")[0]}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={jobData.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        <div className="form-group">
          <label>Attachment</label>
          <input type="file" name="attachment" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={jobData.notes}
            onChange={handleChange}
            placeholder="Notes"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateJobProfileForm;
