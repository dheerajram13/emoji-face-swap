import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if we have a stored user session
        const userJson = await AsyncStorage.getItem('user');
        const storedToken = await AsyncStorage.getItem('token');
        
        if (userJson && storedToken) {
          setUser(JSON.parse(userJson));
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, you would make an API call to your backend
      // const response = await authApi.login(email, password);
      
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: null,
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store user session
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('token', mockToken);
      
      setUser(mockUser);
      setToken(mockToken);
      
      return { success: true };
    } catch (error) {
      console.error('Login failed', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  // Signup function
  const signup = async (email, password, name) => {
    try {
      // In a real app, you would make an API call to your backend
      // const response = await authApi.signup(email, password, name);
      
      // For demo purposes, we'll simulate a successful signup
      const mockUser = {
        id: '2',
        email,
        name,
        avatar: null,
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store user session
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('token', mockToken);
      
      setUser(mockUser);
      setToken(mockToken);
      
      return { success: true };
    } catch (error) {
      console.error('Signup failed', error);
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // In a real app, you would make an API call to invalidate the token
      // await authApi.logout();
      
      // Clear user session
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      if (!user) return { success: false, error: 'Not authenticated' };
      
      // In a real app, you would make an API call to update the user
      // const response = await authApi.updateProfile(user.id, updates);
      
      const updatedUser = { ...user, ...updates };
      
      // Update stored user
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      
      setUser(updatedUser);
      
      return { success: true };
    } catch (error) {
      console.error('Update profile failed', error);
      return { success: false, error: 'Failed to update profile' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
