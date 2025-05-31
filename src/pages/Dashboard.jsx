import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Dashboard = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/me/') // you'll need to implement this endpoint
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!user) return <div>Loading...</div>;
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <main className="text-slate-900 pl-10 pr-10">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-4xl font-bold">Workflow Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {user.is_owner ? (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-2 text-blue-800">Owner Tools</h3>
        <p className="text-gray-600">You can manage clients, create projects, and view reports.</p>
        <div className="space-y-2 mt-4">
          <Link
            to="/create-project"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Project
          </Link>
          <Link
            to="/clients"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            View Clients
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-2 text-purple-800">Assigned Projects</h3>
        <p className="text-gray-600">You’re currently assigned to X projects. Stay updated!</p>
        {/* Later, map over assigned projects */}
      </div>
    </>
  )}
</div>

    </main>
  );
};

export default Dashboard;
