import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HamburgerButton.css";

function HamburgerButton() {
  const [isOpen, setIsOpen] = useState(false); // Manages the state for menu visibility
  const navigate = useNavigate(); // React Router's hook for navigation

  // Toggles the hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  // Close the menu and navigate
  const handleNavigation = (route) => {
    setIsOpen(false); // Close the menu when navigation item is clicked
    navigate(route); // Navigate to the route
  };


  return (
    <>
      <button
        className="hamburger-button" // Always show the three lines without transformation
        onClick={toggleMenu} // Handles the button click
      >
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </button>

      {isOpen && (
        <nav className="nav-menu">
          <ul>

            <li onClick={() => handleNavigation("/account-details")}>
              Account Details
            </li>
            <li onClick={() => handleNavigation("/agenda")}>Agenda</li>
            <li onClick={() => handleNavigation("/JobProfileForm")}>
              Create Job Profile
            </li>
            <li onClick={() => handleNavigation("/")}>Log Out</li>

          </ul>
        </nav>
      )}
    </>
  );
}

export default HamburgerButton;
