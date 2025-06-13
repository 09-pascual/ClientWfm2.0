import { api } from "./api" 

export const getWorkers = async () => {
  try {
    const response = await api.get("/workers") 
    return response.data
  } catch (error) {
    console.error("Error fetching workers:", error)
    throw error
  }
}
