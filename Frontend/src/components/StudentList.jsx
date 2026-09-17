import React from 'react';

const StudentList = ({
  students,
  onEdit,
  onDelete,
  isLoading,
  searchTerm,
}) => {
  // Helper to extract the unique ID (_id or id)
  const getStudentId = (student) => student._id || student.id;

  return (
    <div className="card list-card">
      <div className="card-header flex-header">
        <h2>Student Directory</h2>
        <span className="count-badge">
          {students.length} {students.length === 1 ? 'student' : 'students'}
        </span>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading student records...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <svg
            className="empty-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <h3>{searchTerm ? 'No matching students found' : 'No students registered'}</h3>
          <p>
            {searchTerm
              ? `No student matches "${searchTerm}". Try a different keyword.`
              : 'Add your first student using the form above.'}
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
                <th>Email</th>
                <th>City</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                const id = getStudentId(student) || index + 1;
                // Show shortened ID string if it's a long Mongo ObjectId
                const displayId =
                  typeof id === 'string' && id.length > 8
                    ? `${id.substring(0, 8)}...`
                    : id;

                return (
                  <tr key={id}>
                    <td className="cell-id" title={id}>
                      <code>{displayId}</code>
                    </td>
                    <td className="cell-name">{student.name}</td>
                    <td>{student.age}</td>
                    <td>
                      <span className="badge badge-course">{student.course}</span>
                    </td>
                    <td className="cell-email">{student.email}</td>
                    <td>{student.city}</td>
                    <td className="cell-actions text-center">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onEdit(student)}
                        title="Edit Student"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(id, student.name)}
                        title="Delete Student"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
