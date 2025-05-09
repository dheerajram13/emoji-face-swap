export const API_CONFIG = {
  baseURL: 'http://localhost:8000',
  endpoints: {
    processImage: '/api/v1/process',
    detectFaces: '/api/v1/detect',
  },
};

export const API = {
  processImage: async (image, config) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('emoji_config', JSON.stringify(config));

    const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.processImage}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to process image');
    }

    return response.blob();
  },

  detectFaces: async (image) => {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.detectFaces}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to detect faces');
    }

    return response.json();
  },
};
