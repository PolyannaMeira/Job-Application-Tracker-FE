import './JobsPage.css';
import Api from '../Api';
import { useEffect, useState } from 'react';
import Filter from './Filter/Filter';
import Sort from './Sort/Sort';
import Search from './Search/Search';
import PlusButton from './PlusButton/PlusButton';
import Navbar from './NavBar/NavBar';
import JobProfileForm from './JobProfileForm/JobProfileForm';
import UpdateJobProfileForm from './UpdateJobProfileForm/UpdateJobProfileForm';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';


const jobsList = [];

const JobsPage = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);  // Controls the display of the creation form
  const [showUpdateForm, setShowUpdateForm] = useState(false);  // Controls the display of the update form
  const [jobToUpdate, setJobToUpdate] = useState(null); //Stores the job data to be updated

  const navigate = useNavigate()

  useEffect(() => {
    Api.getMyJobsList().then((data) => setMyJobs(data));
  }, []);

  useEffect(() => {
    let filtered = myJobs;

    if (selectedFilter === 'Interview Planned') {
      filtered = filtered.filter(job => job.interviewDate);
    } else if (selectedFilter === 'Interview Not Planned') {
      filtered = filtered.filter(job => !job.interviewDate);
    } else if (selectedFilter === 'Favorites') {
      filtered = filtered.filter(job => job.isFavorite); // Assuming `isFavorite` is part of the job object
    }

    setFilteredJobs(filtered);
  }, [selectedFilter, myJobs]);


  useEffect(() => {
    let sortedJobs = [...filteredJobs];

    if (sortCriteria === 'Company Name') {
      sortedJobs.sort((a, b) => a.companyName.localeCompare(b.companyName));
    } else if (sortCriteria === 'Interview Date') {
      sortedJobs.sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));
    }

    setFilteredJobs(sortedJobs);
  }, [sortCriteria]);


  const transferHandler = (data) => {
    navigate(`/myjob/${data}`, { replace: true });
  }

  const getDayWithSuffix = (day) => {
    if (day > 3 && day < 21) return day + 'th'; // covers 11th to 20th
    switch (day % 10) {
      case 1: return day + 'st';
      case 2: return day + 'nd';
      case 3: return day + 'rd';
      default: return day + 'th';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = getDayWithSuffix(date.getDate());
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Function to open the create form
  const handleShowCreateForm = () => {
    setShowCreateForm(true);
    setShowUpdateForm(false); // Ensure the update form is closed
  };



  // Function to close any form
  const handleCloseForm = () => {
    setShowCreateForm(false);
    setShowUpdateForm(false);
    setJobToUpdate(null);
  };

  const toggleFavorite = (jobId) => {
    setMyJobs(prevJobs =>
      prevJobs.map(job => 
        job.id === jobId ? { ...job, isFavorite: !job.isFavorite } : job
      )
    );
    // Here, you would also make an API call to update the favorite status on the server
  };

  return (
    <>
      <Navbar/>
      <Search data={jobsList} />
      <Sort onSortChange={setSortCriteria} />
      <Filter onFilterChange={setSelectedFilter} />


      <>
        <ul className='jobList'>
          {filteredJobs.map((j) => (
            <li className='jobItem' key={j.id}>
              <div className="left-container">
                <span className='companyName'>{j.companyName}</span>
                <button className="button-link" onClick={()=>transferHandler(j.id)}>Go to job details</button>
              </div>
              <div className="right-container">
                {/* Favorite Icon */}
                <span onClick={() => toggleFavorite(j.id)} className='favoriteIcon'>
                  {j.isFavorite ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
                </span>
                {/* Interview Date */}
                {j.interviewDate ? (
                  <span className='interviewDate'>{formatDate(j.interviewDate)}</span>
                ) : (
                  <span className='noInterview'>No interview scheduled</span>
                )}
              </div>
            </li>
          ))}
        </ul>
        <PlusButton onClick={handleShowCreateForm} />

        {showCreateForm && <JobProfileForm onClose={handleCloseForm} />}

        {showUpdateForm && <UpdateJobProfileForm jobData={jobToUpdate} onClose={handleCloseForm} />}
      </>
    </>
  );
};

export default JobsPage;
