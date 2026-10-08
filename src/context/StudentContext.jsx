import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as studentApi from '../services/studentApi';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // { id, message, type: 'success' | 'error' | 'info' }

  // Auto-dismiss notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({ id: Date.now(), message, type });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  // Fetch all students
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentApi.getStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to the student API. Please make sure JSON Server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Add new student
  const addStudent = async (studentData) => {
    try {
      // Find highest ID to safely assign next integer ID
      const highestId = students.reduce((max, s) => {
        const numId = parseInt(s.id, 10);
        return !isNaN(numId) && numId > max ? numId : max;
      }, 0);
      const newStudentPayload = {
        ...studentData,
        id: highestId + 1,
      };

      const created = await studentApi.createStudent(newStudentPayload);
      setStudents((prev) => [created, ...prev]);
      showNotification('Student added successfully.', 'success');
      return created;
    } catch (err) {
      showNotification(err.message || 'Failed to add student.', 'error');
      throw err;
    }
  };

  // Update existing student
  const updateStudent = async (id, studentData) => {
    try {
      const updated = await studentApi.updateStudent(id, studentData);
      setStudents((prev) =>
        prev.map((s) => (String(s.id) === String(id) ? updated : s))
      );
      showNotification('Student updated successfully.', 'success');
      return updated;
    } catch (err) {
      showNotification(err.message || 'Failed to update student.', 'error');
      throw err;
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    try {
      await studentApi.deleteStudent(id);
      setStudents((prev) => prev.filter((s) => String(s.id) !== String(id)));
      showNotification('Student deleted successfully.', 'success');
      return true;
    } catch (err) {
      showNotification(err.message || 'Failed to delete student.', 'error');
      throw err;
    }
  };

  const value = {
    students,
    loading,
    error,
    notification,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    showNotification,
    clearNotification,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};

export default StudentContext;
