import { api } from "./api"; // Assuming you're using axios and an api instance

export const getClients = async () => {
    try {
        const response = await api.get("/clients")
        return response.data
    } catch (error) {
        console.error("Failed to fetch clients", error.response?.data || error.message)
        throw error.response?.data || error
    }
}