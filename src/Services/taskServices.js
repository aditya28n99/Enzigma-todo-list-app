import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/sampleTasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };