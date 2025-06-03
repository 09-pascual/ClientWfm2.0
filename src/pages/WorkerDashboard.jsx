import { useEffect, useState } from "react"
import { api } from "../services/api"

export const WorkerDashboard = () => {
    const[projects, setProjects] = useState([])

     useEffect(() => {
        api.get('/my-projects/') // custom endpoint you’ll write for worker's assigned projects
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);


  return (
    <div>
        <h2 className="text-2xl" font-semibold mb-4 text-green-700>Assigned Projects for Worker</h2>
        {projects.length === 0 ? (
            <p>No Assigned Projects</p>
        ) : (
            <ul className="space-y-4">
                {projects.map((project) => (
                    <li key={project.id}  className="bg-white p-4 rounded shadow" > 
                        <h3 className="text-lg font-bold">{project.name}</h3>
                        <p>Status: {project.status}</p>
                        <p>Start: {project.start_date}</p>
                        <p>End: {project.end_date}</p>

                    </li>
                   
                ))}
            </ul>
        )}
    </div>
  )
}