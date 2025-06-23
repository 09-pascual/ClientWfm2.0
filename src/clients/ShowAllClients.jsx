import { useEffect, useState } from "react";
import { getClients } from "../services/ClientServices";

export function ClientList() {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadClients = async () => {
            try {
                const data = await getClients();
                setClients(data);
            } catch (err) {
                setError(err.message || "Failed to load clients");
            } finally {
                setIsLoading(false);
            }
        };
        loadClients();
    }, []);

    if (isLoading) {
        return <div>Loading clients...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div>
                <h2>Clients</h2>
            </div>

            {clients.length > 0 ? (
                clients.map(client => (
                    <div key={client.id}>
                        <div>Client Name: {client.first_name} {client.last_name}</div>
                        <div>Email: {client.email}</div>
                        <div>Address: {client.address}</div>
                        <div>Phone: {client.phone_number}</div>
                        <div>email: {client.email}</div>
                        
                    </div>
                ))
            ) : (
                <div>No clients found</div> 
            )}
        </div>
    );
}