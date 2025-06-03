import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { OwnerDashboard } from './OwnerDashboard';
import { WorkerDashboard } from './WorkerDashboard';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/me/')
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

      {user.is_owner ? <OwnerDashboard /> : <WorkerDashboard />}
    </main>
  );
};

export default Dashboard;
