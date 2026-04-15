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

export const getMe = async () => {
  const response = await axios.get(`${API_URL}/me`, getAuthHeaders());
  return response.data;
};

export const getSymptoms = async () => {
  const response = await axios.get(`${API_URL}/symptomes`, getAuthHeaders());
  return response.data;
};

export const getAppointments = async () => {
  const response = await axios.get(`${API_URL}/appointments`, getAuthHeaders());
  return response.data;
};