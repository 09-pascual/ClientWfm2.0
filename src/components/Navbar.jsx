import { Link, useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("workflow_token")
        navigate("/login")
    }

   return (
    <nav className="bg-blue-600 p-4 text-white shadow-md flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">HomePage</Link>
        <Link to="/projects" className="hover:underline">Projects</Link>
        <Link to="/clients" className="hover:underline">Clients</Link>
        <Link to="/workers" className="hover:underline">Workers</Link>
        <Link to="/groups" className="hover:underline">Groups</Link>
      </div>

      <button 
        onClick={handleLogout} 
        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}