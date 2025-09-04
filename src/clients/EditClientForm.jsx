import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteClient, getClientById, updateClient } from "../services/ClientServices"

export const EditClientForm = () => {
    const {clientId} = useParams()
    const navigate = useNavigate()

    const[client, setClient] = useState({
        id: "",
        first_name: "",
        last_name: "",
        address: "",
        phone_number: "",
        email: "",
    })

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const currentClientInfo = async () => {
          try {
            const clientData = await getClientById()
            
            setClient({
                id: currentClientInfo?.id ?? "",
                first_name : currentClientInfo.first_name,
                last_name : currentClientInfo.last_name,
                address :  currentClientInfo.address,
                phone_number : currentClientInfo.phone_number,
                email : currentClientInfo.email,
            })

            setClient(clientData)

        } catch (err) {
            console.error(err)
            setError(err.message || "Failed to load client")
        } finally {
            setLoading(false)
        } 
        };
        currentClientInfo();
        
    }, [clientId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateClient(clientId, {
                ...client,
                id: parseInt(client.id)
            });
        } catch (err) {
            console.error(err)
            setError("Update has Failed, try again")
        }
    }

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this project")
        if (!confirmed) return

        try {
            await deleteClient(clientId)
            navigate("/")
        } catch (err) {
            console.error(err)
            setError("Failed to delete client")      
        }
    }


    const handleCheckboxChange = (id, field) => {
        const current = client[field] ?? [];
        setClient({
            ...client,
            [field]: current.includes(id)
            ? current.filter((i) => i !== id)
            : [...current, id],
        });
    }

    if (loading)
}