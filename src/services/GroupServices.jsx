import { api } from "./api" 

export const getGroups = async () => {
  try {
    const response = await api.get("/groups") 
    return response.data
  } catch (error) {
    console.error("Error fetching groups:", error)
    throw error
  }
}
