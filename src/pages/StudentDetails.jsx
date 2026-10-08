import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStudentById } from '../services/studentApi';
import { useStudents } from '../context/StudentContext';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Modal from '../components/Modal';
import {
  ArrowLeftIcon,
  EditIcon,
  TrashIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  BookOpenIcon,
  CalendarIcon,
  UsersIcon,
} from '../components/Icons';
import '../styles/pages/StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteStudent } = useStudents();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (err) {
        setError(err.message || `Unable to load student with ID #${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteStudent(id);
      setIsDeleteModalOpen(false);
      navigate('/students');
    } catch {
      // Handled by toast in StudentContext
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <Loader message="Loading student details..." />;
  }

  if (error || !student) {
    return (
      <div className="details-page-container">
        <Link to="/students" className="details-back-link">
          <ArrowLeftIcon size={16} />
          <span>Back to Students</span>
        </Link>
        <ErrorMessage
          title="Student Record Not Found"
          message={error || 'Unable to retrieve student profile.'}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  const initials = student.name
    ? student.name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'S';

  return (
    <div className="details-page-container">
      {/* Top Navigation */}
      <Link to="/students" className="details-back-link">
        <ArrowLeftIcon size={16} />
        <span>Back to Students</span>
      </Link>

      <div className="details-card">
        {/* Decorative Top Banner */}
        <div className="details-banner" />

        {/* Profile Header */}
        <div className="details-header-section">
          <div className="details-profile-identity">
            <div className="details-avatar">{initials}</div>
            <div>
              <h1 className="details-student-name">
                {student.name}
              </h1>
              <div className="details-badges">
                <span className="badge badge-course">{student.course}</span>
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="details-actions-bar">
            <Link
              to={`/students/edit/${student.id}`}
              className="btn btn-secondary btn-sm"
            >
              <EditIcon size={16} />
              <span>Edit Student</span>
            </Link>

            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <TrashIcon size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Complete Information Grid */}
        <div className="details-content-grid">
          {/* Email */}
          <div className="detail-item">
            <span className="detail-label">Email Address</span>
            <div className="detail-value-row">
              <MailIcon size={16} />
              <span className="detail-value">{student.email}</span>
            </div>
          </div>

          {/* Phone */}
          <div className="detail-item">
            <span className="detail-label">Phone Number</span>
            <div className="detail-value-row">
              <PhoneIcon size={16} />
              <span className="detail-value">{student.phone}</span>
            </div>
          </div>

          {/* Age & Gender */}
          <div className="detail-item">
            <span className="detail-label">Age &amp; Gender</span>
            <div className="detail-value-row">
              <UsersIcon size={16} />
              <span className="detail-value">
                {student.age} years old &bull; {student.gender}
              </span>
            </div>
          </div>

          {/* Course */}
          <div className="detail-item">
            <span className="detail-label">Enrolled Course</span>
            <div className="detail-value-row">
              <BookOpenIcon size={16} />
              <span className="detail-value">{student.course}</span>
            </div>
          </div>

          {/* City */}
          <div className="detail-item">
            <span className="detail-label">City</span>
            <div className="detail-value-row">
              <MapPinIcon size={16} />
              <span className="detail-value">{student.city}</span>
            </div>
          </div>

          {/* Enrollment Date */}
          <div className="detail-item">
            <span className="detail-label">Enrollment Date</span>
            <div className="detail-value-row">
              <CalendarIcon size={16} />
              <span className="detail-value">{student.enrollmentDate}</span>
            </div>
          </div>

          {/* Full Address */}
          <div className="detail-item detail-address-item">
            <span className="detail-label">Residential Address</span>
            <span className="detail-value detail-address-value">
              {student.address}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        title="Delete Student Record"
        message="Are you sure you want to permanently delete this student record?"
        studentName={student.name}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
        isDangerous={true}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default StudentDetails;
