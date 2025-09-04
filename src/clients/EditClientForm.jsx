import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getClientById } from "../services/ClientServices"

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

        } catch (error) {
            setError(error.message || "Failed to load client")
        }  
        };
        currentClientInfo();
        
    }, [])

}