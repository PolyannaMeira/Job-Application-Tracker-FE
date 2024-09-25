import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Api from "../../Api";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState({}); // State to hold job details
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors

  const navigate = useNavigate();

  // Fetch job details when the component mounts
  const fetchJobDetails = async (jobId) => {
    try {
      const data = await Api.getMyJobsDetails(jobId);
      setJob(data[0]);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchJobDetails(id);
    }
  }, [id]);

  // Display loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error message if there was an error fetching data
  if (error) {
    return <div>Error: {error}</div>;
  }

  const updateHandler = (jobId) => {
    console.log(jobId)
    navigate(`/update/${jobId}`, { replace: true });
  };

  const backHandler = () => {
    navigate(`/myjobs`, { replace: true });
  };

  const deleteHandler = (jobId) => {
    navigate(`/myjob/${jobId}/delete`, { replace: true });
  };

  // Display job details if data is fetched successfully
  return (
    <div className="job-details">
      <h2 className="title">Job Details</h2>
      <div className="job-details-container">
        <p><strong>Company Name:</strong> {job.companyName}</p>
        <p><strong>Interview Date:</strong> {job.date}</p>
        <p><strong>Job Role:</strong> {job.jobRole}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Attachment:</strong> {job.attachment}</p>
        <p><strong>Job URL:</strong>{" "} <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">Link</a> </p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Notes:</strong> {job.notes}</p>
      </div>
        <div className='update-back-delete-btn'>
          <button className='update' onClick={() => updateHandler(job.id)}>Update</button>
          <button className='back' onClick={backHandler}>Back</button>
          <button className='delete' onClick={() => deleteHandler(job.id)}>Delete</button>
        </div>
    </div>
  );
};

export default JobDetails;