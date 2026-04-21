import api from './api';
import { safeJSONParse } from '../utils/safeJSON';

// Authentication service
const authService = {
  // Login user
  login: async (credentials) => {
    try {
      console.log('Appel API login vers:', '/login');
      console.log('Données envoyées:', credentials);
      
      const response = await api.post('/login', credentials);
      console.log('Réponse API:', response.data);
      
      // La réponse Laravel est dans response.data.data
      const responseData = response.data.data || response.data;
      const { token, user } = responseData;
      
      if (!token || !user) {
        console.error('Réponse API invalide:', responseData);
        return { 
          success: false, 
          error: 'Invalid response from server' 
        };
      }
      
      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log('Login réussi, token stocké:', token);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Erreur API login:', error);
      console.error('Response error:', error.response?.data);
      
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Login failed' 
      };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/register', userData);
      
      // La réponse Laravel est dans response.data.data
      const responseData = response.data.data || response.data;
      const { token, user } = responseData;

      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/me');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get user info'
      };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    const parsedUser = safeJSONParse(user, null);

    // Si parsing a échoué, nettoie les données corrompues
    if (user && !parsedUser) {
      localStorage.removeItem('user');
    }

    return parsedUser;
  }
};

export default authService;
