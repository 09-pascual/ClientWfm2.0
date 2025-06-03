import { Link } from "react-router-dom"

export const OwnerDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Owner Dashboard</h2>
      <Link to="/create-project" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create New Project
      </Link>
      <h2>Show Projects</h2>
    </div>
  );
};
