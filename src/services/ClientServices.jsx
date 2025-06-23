import { api } from "./api"; 

export const getClients = async () => {
    try {
        const response = await api.get("/clients")
        return response.data
    } catch (error) {
        console.error("Failed to fetch clients", error.response?.data || error.message)
        throw error.response?.data || error
    }
}

export const createClient = async (clientData) => {
    try {
        const response = await api.post("/clients", clientData)
        return response.data
    } catch (error) {
        console.error("Failed to create client", error.response?.data || error.message)
        throw error.response?.data || error
    }
}

export const updateClient = async (id, clientData) => {
    try {
        const response = await api.put(`/clients/${id}`, clientData)
        return response.data
    } catch (error) {
        console.error("Failed to update client", error.response?.data || error.message)
        throw error.response?.data || error
    }
}

export const deleteClient = async (id) => {
    try {
        const reponse = await api.delete(`/clients/${id}`)
        return reponse.data
    } catch (error) {
        console.error("Failed to delete client", error.reponse?.data || error.message)
        throw error.response?.data || error
    }
}

export const getClientById = async (id) => {
    try {
        const response = await api.get(`/clients/${id}`)
        return response.data
    } catch (error) {
        console.error("Failed to fetch client", error.response?.data || error.message)
        throw error.response?.data || error
    }
}