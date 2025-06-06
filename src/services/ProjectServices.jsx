const API_URL = "http://localhost:8000";

const Token = () => {
  const tokenData = localStorage.getItem("workflow_token");
  return tokenData ? JSON.parse(tokenData).token : null;
};

const Headers = () => ({
  Authorization: `Token ${Token()}`,
  "Content-Type": "application/json",
});

export const getAllProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      headers: Headers(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch all projects:", error);
    throw error;
  }
};
