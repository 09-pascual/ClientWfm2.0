import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createProject } from "../services/ProjectServices"

export const CreateProjectForm = () => {
    const navigate = useNavigate()
    const  [project, setproject] = useState({
        client: "",
        name: "",
        status: "",
        start_date: "",
        end_date: "",
        expected_duration: "",
        address: "",
        workers: [],
        groups: []
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject  = {
            client: parseInt(project.client),
            name: project.name,
            status: project.status,
            start_date: project.start_date,
            end_date: project.end_date,
            expected_duration: project.expected_duration,
            address: project.address,
            workers: project.workers,
            groups: project.groups
        }

        createProject(newProject).then(() => {navigate("/")})
    }
    return (
        <div>
        <h2>Create New Project Form</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Project Name</label>
                <input 
                type="text" 
                value={project.name} 
                onChange={(e) => setproject({...project, name: e.target.value})}
                />
            </div>'
            <div>
                <label htmlFor="">Project Status</label>
                <input 
                type="text"
                value={project.status}
                onChange={(e) => setproject({...project, status: e.target.value})}
                />
            </div>
            <div>
                <label >start_date</label>
                <input 
                type="text"
                value={project.start_date}
                onChange={(e)=> setproject({...project, start_date: e.target.value})}
                 />
            </div>
            <div>
                <label >end_date</label>
                <input 
                type="text"
                value={project.end_date}
                onChange={(e) => setproject({...project, end_date: e.target.value})} 
                />
            </div>
            <div>
                <label>Expected Duration</label>
                <input 
                type="text"
                onChange={(e) => setproject({...project, expected_duration: e.target.value})}
                />
            </div>
            <div>
                <label>Address</label>
                <input 
                type="text"
                onChange={(e) => setproject({...project, address: e.target.value})}
                />
            </div>
            <div>
                <button 
                type="submit" 
                onClick={navigate("/")}>
                  Create Project  
                </button>
            </div>
        </form>
        </div>
    )
} 