import api from './api';

// Doctors service - Laravel routes /api/medecin
const doctorService = {
  // Get all doctors
  getAll: async () => {
    try {
      const response = await api.get('/medecin');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get doctors' 
      };
    }
  },

  // Get doctor by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/medecin/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get doctor' 
      };
    }
  },

  // Search doctors by city or specialty
  search: async (searchParams) => {
    try {
      const response = await api.get('/medecin/search', { params: searchParams });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to search doctors' 
      };
    }
  }
};

export default doctorService;
