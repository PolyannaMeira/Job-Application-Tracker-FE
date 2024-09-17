import "./JobsPage.css";
import Api from "../Api";
import { useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";
import Search from "./Search/Search";
import HamburgerButton from "./Navigation/Navigation";
import SignUp from "./Signup/Signup";
import Sidebar from "./Sidebar/Sidebar";

const jobsList = [
];
const JobsPage = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    Api.getMyJobsList().then((data) => setMyJobs(data));
  }, []);

  useEffect(() => {
    if (sortOrder) {
      const sortedJobs = [...myJobs].sort((a, b) => {
        return sortOrder === "Ascending"
          ? a.companyName.localeCompare(b.companyName)
          : b.companyName.localeCompare(a.companyName);
      });
      setMyJobs(sortedJobs);
    }
  }, [sortOrder, myJobs]);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <>
      <HamburgerButton />
      <Sort onSortChange={handleSortChange} />
      <Filter
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
      <div>
        <ul className="jobList">
          {myJobs.map((j) => (
            <li className="jobItem" key={j.id}>
              <span className="companyName">{j.companyName}</span>
              <span>{j.jobTitle}</span>
              <span className="jobLink">
                <a href={j.link}>Go to application page</a>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Jobs</h2>
        <Search data={jobsList} />
      </div>
    </>
  );
};

export default JobsPage;
