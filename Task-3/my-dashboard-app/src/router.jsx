import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Overview from "./components/Overview";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Overview /> }, // Default route for /dashboard
      { path: "overview", element: <Overview /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <h1 className="text-center text-2xl">Welcome !</h1>,
  }, // Handle undefined routes
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
