import { api } from "./api";

api.interceptors.request.use(config => {
  const tokenData = localStorage.getItem("workflow_token");
  const token = tokenData ? JSON.parse(tokenData).token : null;
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const getAllProjects = async () => {
  try {
    const response = await api.get('/project');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/project', projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/project/${id}`, projectData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/project/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};