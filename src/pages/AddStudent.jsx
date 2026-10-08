import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';
import { ArrowLeftIcon, UserPlusIcon } from '../components/Icons';
import '../styles/pages/AddStudent.css';

const COURSE_OPTIONS = [
  'React Development',
  'Node.js Development',
  'Python Development',
  'Java Development',
  'Full Stack Development',
  'Web Development',
];

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  age: '',
  gender: 'Male',
  course: '',
  city: '',
  address: '',
  enrollmentDate: new Date().toISOString().split('T')[0],
  status: 'Active',
};

const AddStudent = () => {
  const navigate = useNavigate();
  const { addStudent } = useStudents();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // 1. Name validation
    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Please enter a valid email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // 3. Phone validation (flexible 10-15 digits with optional symbols)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      newErrors.phone = 'Phone number must be valid (10-15 digits).';
    }

    // 4. Age validation (15 to 100)
    const ageNum = Number(formData.age);
    if (!formData.age || isNaN(ageNum) || ageNum < 15 || ageNum > 100) {
      newErrors.age = 'Age must be between 15 and 100.';
    }

    // 5. Course validation
    if (!formData.course) {
      newErrors.course = 'Please select a course.';
    }

    // 6. City validation
    if (!formData.city || !formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    // 7. Address validation
    if (!formData.address || !formData.address.trim()) {
      newErrors.address = 'Address is required.';
    }

    // 8. Enrollment date validation
    if (!formData.enrollmentDate) {
      newErrors.enrollmentDate = 'Enrollment date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addStudent({
        ...formData,
        age: Number(formData.age),
      });
      // Navigate to /students without page reload
      navigate('/students');
    } catch {
      // Error handled by StudentContext toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page-container add-student-page">
      {/* Back button */}
      <Link to="/students" className="form-back-link">
        <ArrowLeftIcon size={16} />
        <span>Back to Students</span>
      </Link>

      <div className="form-card">
        <div className="form-header">
          <h1 className="form-title">Add New Student</h1>
          <p className="form-subtitle">
            Fill in the student details below to register a new student in the system.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`form-input ${errors.name ? 'has-error' : ''}`}
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="form-error-msg">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${errors.email ? 'has-error' : ''}`}
                placeholder="e.g. john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="form-error-msg">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="required-star">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`form-input ${errors.phone ? 'has-error' : ''}`}
                placeholder="e.g. +1 (555) 234-5678"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
            </div>

            {/* Age */}
            <div className="form-group">
              <label htmlFor="age" className="form-label">
                Age (15-100) <span className="required-star">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="15"
                max="100"
                className={`form-input ${errors.age ? 'has-error' : ''}`}
                placeholder="e.g. 22"
                value={formData.age}
                onChange={handleChange}
                required
              />
              {errors.age && <span className="form-error-msg">{errors.age}</span>}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                Gender <span className="required-star">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Course */}
            <div className="form-group">
              <label htmlFor="course" className="form-label">
                Course <span className="required-star">*</span>
              </label>
              <select
                id="course"
                name="course"
                className={`form-select ${errors.course ? 'has-error' : ''}`}
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select a course</option>
                {COURSE_OPTIONS.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {errors.course && <span className="form-error-msg">{errors.course}</span>}
            </div>

            {/* City */}
            <div className="form-group">
              <label htmlFor="city" className="form-label">
                City <span className="required-star">*</span>
              </label>
              <input
                id="city"
                name="city"
                type="text"
                className={`form-input ${errors.city ? 'has-error' : ''}`}
                placeholder="e.g. San Francisco"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && <span className="form-error-msg">{errors.city}</span>}
            </div>

            {/* Enrollment Date */}
            <div className="form-group">
              <label htmlFor="enrollmentDate" className="form-label">
                Enrollment Date <span className="required-star">*</span>
              </label>
              <input
                id="enrollmentDate"
                name="enrollmentDate"
                type="date"
                className={`form-input ${errors.enrollmentDate ? 'has-error' : ''}`}
                value={formData.enrollmentDate}
                onChange={handleChange}
                required
              />
              {errors.enrollmentDate && (
                <span className="form-error-msg">{errors.enrollmentDate}</span>
              )}
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status <span className="required-star">*</span>
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Address */}
            <div className="form-group full-width">
              <label htmlFor="address" className="form-label">
                Full Address <span className="required-star">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                className={`form-textarea ${errors.address ? 'has-error' : ''}`}
                placeholder="e.g. 452 Mission Street, Suite 300"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && (
                <span className="form-error-msg">{errors.address}</span>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/students')}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <UserPlusIcon size={18} />
              <span>{isSubmitting ? 'Saving Student...' : 'Add Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
