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

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/sampleTasks`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/sampleTasks/${taskId}`, taskData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${taskId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/sampleTasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${taskId}:`, error);
    throw error;
  }
};