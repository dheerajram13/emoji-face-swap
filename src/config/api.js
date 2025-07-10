// API Configuration
export const API_CONFIG = {
  baseURL: 'http://localhost:8000',
  endpoints: {
    processImage: '/api/v1/process',
    detectFaces: '/api/v1/detect',
  },
  timeout: 10000, // 10 seconds
};

// Handle API responses with error handling
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Request failed';
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch (e) {
      // If we can't parse JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }
  return response;
};

// API Service
export const API = {
  processImage: async (image, config) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
      
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      
      if (config) {
        formData.append('emoji_config', JSON.stringify(config));
      }

      const response = await fetch(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.processImage}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
          signal: controller.signal,
        }
      );
      
      clearTimeout(timeoutId);
      await handleResponse(response);
      return response.blob();
    } catch (error) {
      console.error('API Error - processImage:', error);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw error;
    }
  },

  detectFaces: async (image) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
      
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await fetch(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.detectFaces}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
          signal: controller.signal,
        }
      );
      
      clearTimeout(timeoutId);
      const responseData = await handleResponse(response);
      return responseData.json();
    } catch (error) {
      console.error('API Error - detectFaces:', error);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw error;
    }
  },
};
