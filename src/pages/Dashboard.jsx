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

  return (
    <main className="text-slate-900 px-10">
      <div className="flex justify-center items-center mb-6 border-b pb-4">
        <h1 className="text-4xl font-bold text-center">Workflow Dashboard</h1>
      </div>

      {user.is_owner ? <OwnerDashboard /> : <WorkerDashboard />}
    </main>
  );
};

export default Dashboard;
