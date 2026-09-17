import axios from 'axios';

// Get backend API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/students';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all students from backend
 * GET /
 */
export const getStudents = async () => {
  const response = await API.get('/');
  // Return data array directly whether wrapped in response.data or response.data.data
  if (Array.isArray(response.data)) {
    return response.data;
  }
  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  return response.data;
};

/**
 * Create a new student record
 * POST /
 * @param {Object} studentData - { name, age, course, email, city }
 */
export const addStudent = async (studentData) => {
  const response = await API.post('/', studentData);
  return response.data;
};

/**
 * Update an existing student record
 * PUT /:id
 * @param {string} id - Student ID (_id or id)
 * @param {Object} studentData - Updated student details
 */
export const updateStudent = async (id, studentData) => {
  const response = await API.put(`/${id}`, studentData);
  return response.data;
};

/**
 * Delete a student record by ID
 * DELETE /:id
 * @param {string} id - Student ID (_id or id)
 */
export const deleteStudent = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};

export default API;
