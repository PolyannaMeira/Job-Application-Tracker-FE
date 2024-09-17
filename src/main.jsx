import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as  Route } from "react-router-dom";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipesPage from "./RecipesPage.jsx";
import JobsPage from "./components/JobsPage.jsx";
import JobDetails from "./components/JobDetails/JobDetails.jsx"
import AccountDetails from "./components/AccountDetails/AccountDetails.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <Error /> },
  { path: "/recipes", element: <RecipesPage /> },
  { path: "/myjobs", element: <JobsPage />},
  { path: "/myjobs/:id", element: <JobDetails/>},
  { Route, path:"/account-details", element: <AccountDetails />}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
