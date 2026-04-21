import api from './api';

// AI Health Advice service - Laravel routes /api/ai/health-advice
const aiService = {
  // Generate health advice
  generateAdvice: async (symptomsData) => {
    try {
      console.log('Appel API IA vers:', '/ai/health-advice');
      console.log('Données symptômes envoyées:', symptomsData);
      
      const response = await api.post('/ai/health-advice', symptomsData);
      console.log('Réponse API IA brute:', response);
      console.log('Réponse API IA data:', response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Erreur API IA:', error);
      console.error('Response error IA:', error.response?.data);
      
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Failed to generate health advice' 
      };
    }
  },

  // Get advice history (if available)
  getHistory: async () => {
    try {
      const response = await api.get('/ai/health-advice');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to get advice history' 
      };
    }
  }
};

export default aiService;
