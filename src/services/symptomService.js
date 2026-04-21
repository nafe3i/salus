import api from './api';

// Symptoms service - Laravel routes /api/symptomes
const symptomService = {
  // Get all symptoms
  getAll: async () => {
    try {
      const response = await api.get('/symptomes');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get symptoms' 
      };
    }
  },

  // Get symptom by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/symptomes/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get symptom' 
      };
    }
  },

  // Create new symptom
  create: async (symptomData) => {
    try {
      const response = await api.post('/symptomes', symptomData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create symptom' 
      };
    }
  },

  // Update symptom
  update: async (id, symptomData) => {
    try {
      const response = await api.put(`/symptomes/${id}`, symptomData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update symptom' 
      };
    }
  },

  // Delete symptom
  delete: async (id) => {
    try {
      const response = await api.delete(`/symptomes/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete symptom' 
      };
    }
  }
};

export default symptomService;
