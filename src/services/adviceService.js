import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
};

export const generateAdvice = async () => {
  const response = await axios.post(
    `${API_URL}/ai/health-advice`,
    {},
    getAuthHeaders()
  );

  return response.data;
};