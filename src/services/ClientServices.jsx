import { api } from "./api"; // Assuming you're using axios and an api instance

export const getClients = async () => {
    const response = await api.get("/clients");
    return response.data;
};
