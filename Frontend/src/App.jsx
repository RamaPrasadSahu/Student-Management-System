import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from './services/api';

function App() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Fetch all students on component mount
  const fetchAllStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(
        'Unable to connect to backend server. Make sure Node Express server is running at http://localhost:5000'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  // Show temporary success message alert
  const triggerSuccess = (message) => {
    setSuccessMsg(message);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 4000);
  };

  // Handle Add or Edit Student Form Submission
  const handleFormSubmit = async (studentPayload) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (currentStudent) {
        // Edit Mode -> PUT request
        const targetId = currentStudent._id || currentStudent.id;
        await updateStudent(targetId, studentPayload);
        triggerSuccess(`Student "${studentPayload.name}" updated successfully!`);
        setCurrentStudent(null);
      } else {
        // Add Mode -> POST request
        await addStudent(studentPayload);
        triggerSuccess(`Student "${studentPayload.name}" added successfully!`);
      }
      // Refresh student list
      await fetchAllStudents();
    } catch (err) {
      console.error('Error saving student:', err);
      setError(
        err.response?.data?.message ||
        'Failed to save student data. Please check your backend connection.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Edit button click
  const handleEdit = (student) => {
    setCurrentStudent(student);
    setError(null);
    // Smooth scroll to top form section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setCurrentStudent(null);
  };

  // Handle Delete button click
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await deleteStudent(id);
      triggerSuccess(`Student "${name}" deleted successfully.`);
      await fetchAllStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
      setError(
        err.response?.data?.message ||
        'Failed to delete student. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Filter students based on search input
  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="app-layout">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <main className="container">
        {/* Status Alerts */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <div className="alert-content">
              <strong>Connection Notice:</strong> {error}
            </div>
            <button
              className="alert-close"
              onClick={() => setError(null)}
              title="Close alert"
            >
              &times;
            </button>
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success" role="alert">
            <div className="alert-content">
              <strong>Success:</strong> {successMsg}
            </div>
            <button
              className="alert-close"
              onClick={() => setSuccessMsg(null)}
              title="Close alert"
            >
              &times;
            </button>
          </div>
        )}

        {/* Top Controls: Search Bar */}
        <div className="top-controls">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Main Grid: Form + Student Table */}
        <div className="main-content-grid">
          <StudentForm
            currentStudent={currentStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelEdit}
            isLoading={isSubmitting}
          />

          <StudentList
            students={filteredStudents}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
            searchTerm={searchTerm}
          />
        </div>
      </main>

      <footer className="footer">
        <p>Student Management System &bull; Frontend for Express/MongoDB Practice</p>
      </footer>
    </div>
  );
}

export default App;
