import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProject, getProjectById, updateProject } from "../services/ProjectServices";
import { getWorkers } from "../services/WorkerServices";
import { getGroups } from "../services/GroupServices";
import { getClients } from "../services/ClientServices";

export const EditProjectForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    client: "",
    name: "",
    status: "",
    start_date: "",
    end_date: "",
    expected_duration: "",
    address: "",
    worker_ids: [],
    group_ids: [],
  });

  const [workers, setWorkers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proj, workersData, groupsData, clientsData] = await Promise.all([
          getProjectById(projectId),
          getWorkers(),
          getGroups(),
          getClients(),
        ]);

        setProject({
          client: proj.client?.id ?? "",
          name: proj.name,
          status: proj.status,
          start_date: proj.start_date,
          end_date: proj.end_date,
          expected_duration: proj.expected_duration,
          address: proj.address,
          worker_ids: proj.worker_ids ?? [],
          group_ids: proj.group_ids ?? [],
        });

        setWorkers(workersData);
        setGroups(groupsData);
        setClients(clientsData);
      } catch (err) {
        console.error(err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProject(projectId, {
        ...project,
        expected_duration: parseInt(project.expected_duration),
        client_id: parseInt(project.client),
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Update failed.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this project?")
    if (!confirmed) return

    try {
      await deleteProject(projectId)
      navigate("/")
    } catch (err) {
      console.error(err)
      setError("Failed to delete project")
    }
  }

  const handleCheckboxChange = (id, field) => {
    const current = project[field] ?? [];
    setProject({
      ...project,
      [field]: current.includes(id)
        ? current.filter((i) => i !== id)
        : [...current, id],
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Client</label>
          <select
            className="w-full border rounded p-2"
            value={project.client}
            onChange={(e) => setProject({ ...project, client: e.target.value })}
            required
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.first_name}   {client.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Project Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            className="w-full border rounded p-2"
            value={project.status}
            onChange={(e) => setProject({ ...project, status: e.target.value })}
            required
          >
            <option value="">Select Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={project.start_date}
            onChange={(e) => setProject({ ...project, start_date: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            className="w-full border rounded p-2"
            value={project.end_date}
            onChange={(e) => setProject({ ...project, end_date: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Expected Duration (days)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={project.expected_duration}
            onChange={(e) =>
              setProject({ ...project, expected_duration: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={project.address}
            onChange={(e) => setProject({ ...project, address: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Assign Workers</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {workers.map((worker) => (
              <label key={worker.id} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={project.worker_ids?.includes(worker.id) || false}
                  onChange={() => handleCheckboxChange(worker.id, "worker_ids")}
                />
                {worker.email}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Assign Groups</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {groups.map((group) => (
              <label key={group.id} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={project.group_ids?.includes(group.id) || false}
                  onChange={() => handleCheckboxChange(group.id, "group_ids")}
                />
                {group.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Project
          </button>
        </div>
        <div>
          <button type="button"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
          onClick={handleDelete}>
            Delete Project
          </button>
          </div>
      </form>
    </div>
  );
};
