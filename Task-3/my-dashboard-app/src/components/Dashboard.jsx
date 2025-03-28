import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-5">Dashboard</h2>
        <ul>
          <li className="mb-3">
            <Link to="overview" className="hover:text-gray-300">
              Overview
            </Link>
          </li>
          <li className="mb-3">
            <Link to="profile" className="hover:text-gray-300">
              Profile
            </Link>
          </li>
          <li>
            <Link to="settings" className="hover:text-gray-300">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
}
