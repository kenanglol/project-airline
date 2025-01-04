import axios from 'axios';

const BASE_URL = 'http://localhost:8083/api/users';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  authHeader: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { 
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      };
    }
    return {};
  }
};

export default authService; 