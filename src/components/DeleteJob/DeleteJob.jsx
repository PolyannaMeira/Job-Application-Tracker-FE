import './DeleteJob.css';
import { useParams, useNavigate } from 'react-router-dom';
import Api from "./../../Api";
import { FaTrash } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';


const DeleteJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      const response = await Api.deleteJobDetails(id);
        if(response.message){
        alert("Job has been deleted");
        navigate(`/myjobs`, { replace: true });
      }
    } catch (error) {
      alert('An error occurred while deleting the job');
      console.error(error);
    }
  }

  const goBackHandler=()=>{
    navigate(`/myjob/${id}`, { replace: true });
  }

  const handleCancel=()=>{
    navigate(`/myjob/${id}`, { replace: true });
  }

  return (
    <div className="delete-container">
      <MdCancel className="cancel-icon" onClick={handleCancel}/>
      <FaTrash style={{ marginLeft: '10px', color: 'red', fontSize: '24px', cursor: 'pointer' }} />
        <div className='delete-confirm-message'>Are you sure you want to delete this job ? This action cannot be undone.</div>
        <div className='btn'>
          <button className="delete-cancel-btn" onClick ={goBackHandler} >Cancel</button>
          <button className="delete-confirm-btn" onClick={deleteHandler}> Delete</button>
        </div>
    </div>
  );
}

export default DeleteJob;