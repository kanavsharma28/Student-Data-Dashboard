import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';
import SearchFilterBar from '../components/SearchFilterBar';
import StudentTable from '../components/StudentTable';
import StudentCard from '../components/StudentCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { UserPlusIcon } from '../components/Icons';
import '../styles/pages/Students.css';

const PAGE_SIZE = 10;

const Students = () => {
  const { students, loading, error, fetchStudents, deleteStudent } = useStudents();

  // Filter & Search & Sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Delete modal state
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Dynamically extract unique cities from student data
  const availableCities = useMemo(() => {
    const cities = new Set(
      students.map((s) => s.city?.trim()).filter(Boolean)
    );
    return Array.from(cities).sort();
  }, [students]);

  // Combined search and multi-filter logic
  const filteredStudents = useMemo(() => {
    let result = [...students];

    // 1. Search across Name, Email, Course, City (case-insensitive)
    if (searchTerm.trim()) {
      const query = searchTerm.trim().toLowerCase();
      result = result.filter(
        (s) =>
          s.name?.toLowerCase().includes(query) ||
          s.email?.toLowerCase().includes(query) ||
          s.course?.toLowerCase().includes(query) ||
          s.city?.toLowerCase().includes(query)
      );
    }

    // 2. Course filter
    if (selectedCourse !== 'All') {
      result = result.filter((s) => s.course === selectedCourse);
    }

    // 3. Gender filter
    if (selectedGender !== 'All') {
      result = result.filter(
        (s) => s.gender?.toLowerCase() === selectedGender.toLowerCase()
      );
    }

    // 4. Status filter
    if (selectedStatus !== 'All') {
      result = result.filter(
        (s) => s.status?.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    // 5. City filter
    if (selectedCity !== 'All') {
      result = result.filter((s) => s.city === selectedCity);
    }

    // 6. Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'age-asc':
          return Number(a.age || 0) - Number(b.age || 0);
        case 'age-desc':
          return Number(b.age || 0) - Number(a.age || 0);
        case 'date-desc':
          return new Date(b.enrollmentDate || 0) - new Date(a.enrollmentDate || 0);
        case 'date-asc':
          return new Date(a.enrollmentDate || 0) - new Date(b.enrollmentDate || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [
    students,
    searchTerm,
    selectedCourse,
    selectedGender,
    selectedStatus,
    selectedCity,
    sortBy,
  ]);

  // Reset to page 1 whenever search, filter, or sort criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCourse, selectedGender, selectedStatus, selectedCity, sortBy]);

  // Slice paginated items
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredStudents.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredStudents, currentPage]);

  // Check if any filter is active
  const isFiltered =
    searchTerm.trim() !== '' ||
    selectedCourse !== 'All' ||
    selectedGender !== 'All' ||
    selectedStatus !== 'All' ||
    selectedCity !== 'All';

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCourse('All');
    setSelectedGender('All');
    setSelectedStatus('All');
    setSelectedCity('All');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  // Delete modal actions
  const handleDeleteRequest = (student) => {
    setStudentToDelete(student);
  };

  const handleCancelDelete = () => {
    setStudentToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    setIsDeleting(true);
    try {
      await deleteStudent(studentToDelete.id);
      setStudentToDelete(null);
    } catch {
      // Error handled inside StudentContext
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <Loader message="Loading student records..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Unable to Load Students"
        message={error}
        onRetry={fetchStudents}
      />
    );
  }

  return (
    <div className="students-page">
      {/* Header section with Title and Add CTA */}
      <div className="students-header">
        <div>
          <h1 className="students-title">
            Student Management
          </h1>
          <p className="students-subtitle">
            Manage, search, filter, and organize enrolled students across all departments.
          </p>
        </div>

        <Link to="/students/add" className="btn btn-primary">
          <UserPlusIcon size={18} />
          <span>+ Add Student</span>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCourse={selectedCourse}
        onCourseChange={setSelectedCourse}
        selectedGender={selectedGender}
        onGenderChange={setSelectedGender}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        availableCities={availableCities}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
        isFiltered={isFiltered}
      />

      {/* Main Content Area: Table / Cards / Empty State */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          isFilterActive={isFiltered || students.length > 0}
          onClearFilters={handleClearFilters}
        />
      ) : (
        <>
          {/* Desktop Table View */}
          <StudentTable
            students={paginatedStudents}
            onDeleteClick={handleDeleteRequest}
          />

          {/* Mobile / Tablet Cards View */}
          <div className="student-cards-grid">
            {paginatedStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onDeleteClick={handleDeleteRequest}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredStudents.length}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(studentToDelete)}
        title="Delete Student Record"
        message="Are you sure you want to delete this student?"
        studentName={studentToDelete?.name}
        confirmLabel="Delete Student"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDangerous={true}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Students;
