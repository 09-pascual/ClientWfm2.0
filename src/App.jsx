import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Registration';
import { CreateProjectForm } from './Projects/CreateNewProjectForm';
import { EditProjectForm } from './Projects/EditProjectForm';
import { Navbar } from './components/Navbar';
import { ClientList } from './clients/ShowAllClients';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route element={<>
          <Navbar/>
          <ProtectedRoute /> 
          </>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-Project" element={<CreateProjectForm/>}/>
          <Route path="/editProjectForm/:projectId" element={<EditProjectForm/>}/>
          <Route path="/clients" element={<ClientList/>}/>
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;