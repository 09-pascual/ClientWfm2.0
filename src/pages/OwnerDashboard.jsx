import { Link } from "react-router-dom";
import { ProjectList } from "../Projects/ShowAllProjects";

export const OwnerDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Owner Dashboard</h2>
      
      <ProjectList />

      <div className="flex justify-center mt-10">
        <Link
          to="/create-project"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
        >
          + Create New Project
        </Link>
      </div>
    </div>
  );
};
