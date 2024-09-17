import { useState } from "react";
import "./Sidebar.css";
import {
  FaUser,
  FaCalendarAlt,
  FaPlusSquare,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to trigger sidebar */}
      <button onClick={toggleSidebar} className="sidebar-toggle">
        Menu
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <FaUser />
            <span>Account details</span>
            <FaArrowRight />
          </li>
          <li>
            <FaCalendarAlt />
            <span>Agenda</span>
            <FaArrowRight />
          </li>
          <li>
            <FaPlusSquare />
            <span>Create a job profile</span>
            <FaArrowRight />
          </li>
          <li>
            <FaHome />
            <span>Home Page</span>
            <FaArrowRight />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
