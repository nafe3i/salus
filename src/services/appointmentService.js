import api from './api';

// Appointments service - Laravel routes /api/appointments
const appointmentService = {
  // Get all appointments
  getAll: async () => {
    try {
      const response = await api.get('/appointments');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get appointments' 
      };
    }
  },

  // Get appointment by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/appointments/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get appointment' 
      };
    }
  },

  // Create new appointment
  create: async (appointmentData) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create appointment' 
      };
    }
  },

  // Update appointment
  update: async (id, appointmentData) => {
    try {
      const response = await api.put(`/appointments/${id}`, appointmentData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update appointment' 
      };
    }
  },

  // Delete appointment
  delete: async (id) => {
    try {
      const response = await api.delete(`/appointments/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete appointment' 
      };
    }
  }
};

export default appointmentService;
