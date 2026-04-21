import { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIN
  const login = async (form) => {
    try {
      console.log('AuthContext login appelé');
      const result = await authService.login(form);
      console.log('AuthContext login result:', result);
      
      if (result.success) {
        // La structure Laravel est result.data.data.user
        const userData = result.data?.data?.user || result.data?.user || result.data;
        console.log('User data extracted:', userData);
        setUser(userData);
        return userData;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('AuthContext login error:', error);
      throw error;
    }
  };

  // REGISTER
  const register = async (form) => {
    try {
      const result = await authService.register(form);
      
      if (result.success) {
        // La structure Laravel est result.data.data.user
        const userData = result.data?.data?.user || result.data?.user || result.data;
        setUser(userData);
        return userData;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error;
    }
  };

  // LOGOUT
  const logout = async () => {
    authService.logout();
    setUser(null);
  };

  // CHECK AUTHENTICATION STATUS
  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  // GET USER (/me)
  const getUser = async () => {
    try {
      const result = await authService.getCurrentUser();
      if (result.success) {
        setUser(result.data);
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is already stored in localStorage
    try {
      const storedUser = authService.getStoredUser();
      
      // Vérification supplémentaire que storedUser est un objet valide
      if (storedUser && typeof storedUser === 'object' && storedUser.id) {
        setUser(storedUser);
        setLoading(false);
      } else if (authService.isAuthenticated()) {
        getUser();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.warn('Error in AuthContext useEffect:', error);
      // En cas d'erreur, on nettoie tout et on arrête le chargement
      authService.logout();
      setUser(null);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};