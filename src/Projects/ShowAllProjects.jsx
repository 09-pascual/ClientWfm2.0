import { useEffect, useState } from "react";
import { getAllProjects } from "../services/ProjectServices";

export const ShowAllProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error("Error fetching Projects", error));
  }, []);

  return (
    <div>
      <h2>All Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} — {project.status}
          </li>
        ))}
      </ul>
    </div>
  );
};
