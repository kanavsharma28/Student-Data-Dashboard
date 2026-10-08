import React from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EditIcon, TrashIcon } from './Icons';
import '../styles/components/StudentTable.css';

const StudentTable = ({ students, onDeleteClick }) => {
  // Helper to extract initials for avatar
  const getInitials = (name) => {
    if (!name) return 'S';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="table-responsive-container">
      <table className="student-table" aria-label="Student management table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>City</th>
            <th>Status</th>
            <th className="table-actions-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              {/* Name & Avatar */}
              <td>
                <div className="student-name-cell">
                  <div className="student-avatar" aria-hidden="true">
                    {getInitials(student.name)}
                  </div>
                  <div>
                    <div className="table-student-name">{student.name}</div>
                    <div className="table-student-meta">
                      Age: {student.age} &bull; {student.gender}
                    </div>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td>
                <span className="table-muted-value">{student.email}</span>
              </td>

              {/* Phone */}
              <td>
                <span className="table-muted-value">{student.phone}</span>
              </td>

              {/* Course Badge */}
              <td>
                <span className="badge badge-course">{student.course}</span>
              </td>

              {/* City */}
              <td>
                <span>{student.city}</span>
              </td>

              {/* Status Badge */}
              <td>
                <span
                  className={`badge ${
                    student.status?.toLowerCase() === 'active'
                      ? 'badge-active'
                      : 'badge-inactive'
                  }`}
                >
                  {student.status}
                </span>
              </td>

              {/* Action Buttons: View, Edit, Delete */}
              <td>
                <div className="table-actions table-actions-centered">
                  <Link
                    to={`/students/${student.id}`}
                    className="action-btn view"
                    title="View Student Details"
                    aria-label={`View details of ${student.name}`}
                  >
                    <EyeIcon size={16} />
                  </Link>

                  <Link
                    to={`/students/edit/${student.id}`}
                    className="action-btn edit"
                    title="Edit Student"
                    aria-label={`Edit ${student.name}`}
                  >
                    <EditIcon size={16} />
                  </Link>

                  <button
                    type="button"
                    className="action-btn delete"
                    title="Delete Student"
                    aria-label={`Delete ${student.name}`}
                    onClick={() => onDeleteClick(student)}
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
