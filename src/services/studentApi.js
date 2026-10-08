import axios from 'axios';

// Base API URL for JSON Server
const API_URL = 'http://localhost:3000/students';

// Axios instance with default headers and timeout
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Enhanced error helper to provide friendly error messages
 */
const handleApiError = (error, defaultMsg) => {
  if (error.code === 'ECONNABORTED' || error.message.includes('Network Error') || !error.response) {
    throw new Error('Unable to connect to the student API. Please make sure JSON Server is running (npm run server).');
  }
  const message = error.response?.data?.message || error.message || defaultMsg;
  throw new Error(message);
};

/**
 * Fetch all students from the REST API
 * @returns {Promise<Array>} List of students
 */
export const getStudents = async () => {
  try {
    const response = await apiClient.get('');
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Unable to load students. Please try again.');
  }
};

/**
 * Fetch a single student by ID
 * @param {string|number} id Student ID
 * @returns {Promise<Object>} Student record
 */
export const getStudentById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Unable to find student with ID #${id}.`);
  }
};

/**
 * Create a new student record
 * @param {Object} studentData Student object
 * @returns {Promise<Object>} Created student
 */
export const createStudent = async (studentData) => {
  try {
    const response = await apiClient.post('', studentData);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Failed to create student. Please verify your data.');
  }
};

/**
 * Update an existing student record
 * @param {string|number} id Student ID
 * @param {Object} studentData Updated student object
 * @returns {Promise<Object>} Updated student
 */
export const updateStudent = async (id, studentData) => {
  try {
    const response = await apiClient.put(`/${id}`, studentData);
    return response.data;
  } catch (error) {
    return handleApiError(error, 'Failed to update student details. Please try again.');
  }
};

/**
 * Delete a student record by ID
 * @param {string|number} id Student ID
 * @returns {Promise<boolean>} True if successful
 */
export const deleteStudent = async (id) => {
  try {
    await apiClient.delete(`/${id}`);
    return true;
  } catch (error) {
    return handleApiError(error, 'Failed to delete student. Please try again.');
  }
};

export default {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
