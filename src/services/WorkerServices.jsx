import { api } from "./api" // Assuming you have a configured Axios instance named `api`

export const getWorkers = async () => {
  try {
    const response = await api.get("/workers") // Adjust the endpoint if needed
    return response.data
  } catch (error) {
    console.error("Error fetching workers:", error)
    throw error
  }
}
