import { useEffect, useState } from "react";
import { getClients } from "../services/ClientServices";
import { Link } from "react-router-dom";

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
    return <div className="text-center mt-10 text-gray-600">Loading clients...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <Link
          to={`/create-client-form`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Client
        </Link>
      </div>

      {clients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition"
            >
              <div className="font-semibold text-lg">
                {client.first_name} {client.last_name}
              </div>
              <div className="text-gray-600">Email: {client.email}</div>
              <div className="text-gray-600">Address: {client.address}</div>
              <div className="text-gray-600">Phone: {client.phone_number}</div>
              <div className="mt-2">
                <Link
                  to={`/Edit-Client/${client.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">No clients found</div>
      )}
    </div>
  );
}
