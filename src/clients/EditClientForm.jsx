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
            const clientData = await getClientById(clientId)
            
            setClient({
                id: currentClientInfo?.id ?? "",
                first_name: clientData?.first_name?? "",
                last_name: clientData?.last_name??"",
                address: clientData?.address??"",
                phone_number: clientData?.phone_number??"",
                email: clientData?.email??"",
            })
        } catch (err) {
            console.error(err)
            setError(err.message || "Failed to load client")
        } finally {
            setLoading(false)
        } 
        };
        if (clientId) {
            currentClientInfo();
        }
        
    }, [clientId])


    const handleInputChange = (e) => {
        const {name, value} = e.target
        setClient(prevClient => ({
            ...prevClient,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateClient(clientId, {
                ...client,
                id: parseInt(client.id)
            });
            navigate("/clients")
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


    if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>
    if (error) return <div className="text-center mt-10 text-red-600">Error: {error}</div>

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Client</h2>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Delete Client
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={client.first_name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={client.last_name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={client.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        value={client.phone_number}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        value={client.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/clients")}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Update Client
                    </button>
                </div>
            </form>
        </div>
    )

}