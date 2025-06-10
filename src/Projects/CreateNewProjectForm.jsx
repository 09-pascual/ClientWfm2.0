import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createProject} from "../services/ProjectServices"
import { getWorkers } from "../services/WorkerServices"
import { getGroups } from "../services/GroupServices"
import { getClients } from "../services/ClientServices"

export const CreateProjectForm = () => {
    const navigate = useNavigate()

    const [project, setProject] = useState({
        client: "",
        name: "",
        status: "",
        start_date: "",
        end_date: "",
        expected_duration: "",
        address: "",
        worker_ids: [],
        group_ids: []
    })

    const [workers, setWorkers] = useState([])
    const [groups, setGroups] = useState([])
    const [clients, setClients] = useState([])
    const [error, setError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        getWorkers().then(setWorkers).catch(err => setError("Failed to load workers"))
        getGroups().then(setGroups).catch(err => setError("Failed to load groups"))
        getClients().then(setClients).catch(err => setError("Failed to get clients"))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const newProject = {
                client: parseInt(project.client),
                name: project.name,
                status: project.status,
                start_date: project.start_date,
                end_date: project.end_date,
                expected_duration: parseInt(project.expected_duration),
                address: project.address,
                worker_ids: project.worker_ids,
                group_ids: project.group_ids
            }

            await createProject(newProject)
            navigate("/")
        } catch (err) {
            console.error(err)
            setError("Something went wrong while creating the project.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCheckboxChange = (id, field) => {
        const current = project[field]
        setProject({
            ...project,
            [field]: current.includes(id)
                ? current.filter(i => i !== id)
                : [...current, id]
        })
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-4">Create New Project</h2>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                    <label className="block text-sm font-medium">Client</label>
                    <select
                        className="w-full border rounded p-2"
                        value={project.client}
                        onChange={(e) =>
                            setProject({ ...project, client: e.target.value })
                        }
                        required
                    >
                        <option value="">Select a Client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.first_name} {client.last_name}
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
                        onChange={(e) => setProject({ ...project, expected_duration: e.target.value })}
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
                                    checked={project.worker_ids.includes(worker.id)}
                                    onChange={() => handleCheckboxChange(worker.id, 'worker_ids')}
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
                                    checked={project.group_ids.includes(group.id)}
                                    onChange={() => handleCheckboxChange(group.id, 'group_ids')}
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
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Project"}
                    </button>
                </div>
            </form>
        </div>
    )
}
