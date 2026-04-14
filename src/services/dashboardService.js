import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getMe = async () => {
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};

export const getSymptoms = async () => {
  const response = await axios.get(`${API_URL}/symptoms`);
  return response.data;
};

export const getAppointments = async () => {
  const response = await axios.get(`${API_URL}/appointments`);
  return response.data;
};