import { useEffect, useState } from 'react';
import { getAllProjects } from '../services/ProjectServices';

export function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        setError(err.message || "Failed to load projects");
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.status === statusFilter);
      setFilteredProjects(filtered);
    }
  }, [statusFilter, projects]);

  if (error) {
    return (
      <div className="text-red-500 font-semibold text-center mt-4">
        Error: {error}
      </div>
    );
  }
return (
  <div className="max-w-7xl mx-auto p-6 space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-gray-900">All Projects</h2>

      <div className="flex items-center gap-3">
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="upcoming">Upcoming</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>

    {filteredProjects.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {project.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    project.status === "open"
                      ? "bg-green-100 text-green-800"
                      : project.status === "upcoming"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <p className="text-gray-500">Expected Duration</p>
                  <p className="font-medium text-gray-900">
                    {project.expected_duration} days
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Start Date</p>
                  <p className="font-medium text-gray-900">
                    {project.start_date}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">End Date</p>
                  <p className="font-medium text-gray-900">
                    {project.end_date}
                  </p>
                </div>
                <div>
                  <p className='text-gray-500'>Address</p>
                  <p className='font-medium text-gray-900'>{project.address} addy</p>
                </div>
               <div className='text-gray-500'>
                  <p>Group Name</p>
                  {project.groups?.length > 0 ? (
                <div>
                {project.groups.map((projectgroup) => (
                  <p key={projectgroup.id} className='font-medium text-gray-900'>{projectgroup.name}</p>
                ))}
                </div>
              ) : (
              <p className='font-medium text-gray-900'>No groups available</p>
              )}
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-lg">
          {statusFilter === "all"
            ? "No projects available."
            : `No ${statusFilter} projects available.`}
        </p>
      </div>
    )}
  </div>
);

}
