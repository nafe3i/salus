import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const generateAdvice = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/ai/advice`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};