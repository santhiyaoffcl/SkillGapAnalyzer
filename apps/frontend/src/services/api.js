// Read API URL from environment variable (.env) or fallback to localhost Spring Boot server
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';

/**
 * Helper to make API requests with automatic JWT token attachment.
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('accessToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || data?.message || 'An error occurred during request');
    }

    return data;
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Auth endpoints
  register: (userData) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  logout: (refreshToken) => request('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  }),

  getMe: () => request('/auth/me', {
    method: 'GET',
  }),

  // Health check
  getHealth: () => request('/health', {
    method: 'GET',
  }),

  // User endpoints
  updateProfile: (profileData) => request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(profileData),
  }),

  changePassword: (passwordData) => request('/users/me/password', {
    method: 'PATCH',
    body: JSON.stringify(passwordData),
  }),

  // Analysis endpoints
  saveAnalysis: (analysisData) => request('/analyses', {
    method: 'POST',
    body: JSON.stringify(analysisData),
  }),

  getMyAnalyses: () => request('/analyses/my-history', {
    method: 'GET',
  }),

  deleteAnalysis: (id) => request(`/analyses/${id}`, {
    method: 'DELETE',
  }),

  // Roadmap endpoints
  saveRoadmap: (roadmapData) => request('/roadmaps', {
    method: 'POST',
    body: JSON.stringify(roadmapData),
  }),

  getMyRoadmaps: () => request('/roadmaps/my-history', {
    method: 'GET',
  }),

  updateTaskStatus: (id, phaseIndex, taskIndex, completed) => request(`/roadmaps/${id}/tasks`, {
    method: 'PATCH',
    body: JSON.stringify({ phaseIndex, taskIndex, completed }),
  }),
};

