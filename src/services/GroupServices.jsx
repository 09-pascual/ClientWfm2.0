import { api } from "./api" // Assuming you have a configured Axios instance named `api`

export const getGroups = async () => {
  try {
    const response = await api.get("/groups") // Adjust the endpoint if needed
    return response.data
  } catch (error) {
    console.error("Error fetching groups:", error)
    throw error
  }
}
