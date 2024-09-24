import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import JobsPage from "./components/JobsPage.jsx";
import JobDetails from "./components/JobDetails/JobDetails.jsx"
import AccountDetails from "./components/AccountDetails/AccountDetails.jsx";
import DeleteJob from "./components/DeleteJob/DeleteJob.jsx";
import JobProfileForm from "./components/JobProfileForm/JobProfileForm.jsx";
import UpdateJobProfileForm from "./components/UpdateJobProfileForm/UpdateJobProfileForm.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import Navbar from "./components/NavBar/NavBar.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/", // A wrapper path for all routes with Navbar
    element: (
      <>
        <Navbar /> {/* Always visible Navbar */}
        <Outlet /> {/* This will render the current page */}
      </>
    ),
    children: [
      { path: "myjobs", element: <JobsPage /> },
      { path: "myjob/:id", element: <JobDetails /> },
      { path: "delete/:id", element: <DeleteJob /> },
      { path: "account-details", element: <AccountDetails /> },
      { path: "JobProfileForm", element: <JobProfileForm /> },
      { path: "update/:id", element: <UpdateJobProfileForm /> },
    ],
  },
  { path:"/signup", element: <SignUp/>} 
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
