import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, PhoneIcon, MapPinIcon, BookOpenIcon, EyeIcon, EditIcon, TrashIcon } from './Icons';
import '../styles/components/StudentCard.css';

const StudentCard = ({ student, onDeleteClick }) => {
  const getInitials = (name) => {
    if (!name) return 'S';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <article className="student-card" aria-label={`Student card for ${student.name}`}>
      {/* Card Header: Avatar, Name, Status */}
      <div className="student-card-header">
        <div className="student-card-identity">
          <div className="student-avatar" aria-hidden="true">
            {getInitials(student.name)}
          </div>
          <div>
            <h4 className="student-card-name">
              {student.name}
            </h4>
            <div className="student-card-meta">
              Age: {student.age} &bull; {student.gender}
            </div>
          </div>
        </div>

        <span
          className={`badge ${
            student.status?.toLowerCase() === 'active'
              ? 'badge-active'
              : 'badge-inactive'
          }`}
        >
          {student.status}
        </span>
      </div>

      {/* Card Body: Course, Email, Phone, City */}
      <div className="student-card-body">
        <div className="card-info-row">
          <BookOpenIcon size={16} />
          <span className="student-card-course">{student.course}</span>
        </div>

        <div className="card-info-row">
          <MailIcon size={16} />
          <span>{student.email}</span>
        </div>

        <div className="card-info-row">
          <PhoneIcon size={16} />
          <span>{student.phone}</span>
        </div>

        <div className="card-info-row">
          <MapPinIcon size={16} />
          <span>{student.city}</span>
        </div>
      </div>

      {/* Card Actions: View, Edit, Delete */}
      <div className="student-card-actions">
        <Link
          to={`/students/${student.id}`}
          className="btn btn-secondary btn-sm"
          aria-label={`View details of ${student.name}`}
        >
          <EyeIcon size={15} />
          <span>View</span>
        </Link>

        <Link
          to={`/students/edit/${student.id}`}
          className="btn btn-secondary btn-sm"
          aria-label={`Edit ${student.name}`}
        >
          <EditIcon size={15} />
          <span>Edit</span>
        </Link>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => onDeleteClick(student)}
          aria-label={`Delete ${student.name}`}
        >
          <TrashIcon size={15} />
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
};

export default StudentCard;
