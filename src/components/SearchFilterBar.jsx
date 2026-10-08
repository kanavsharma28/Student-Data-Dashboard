import React from 'react';
import { SearchIcon, RefreshIcon } from './Icons';
import '../styles/components/SearchFilterBar.css';

const COURSE_OPTIONS = [
  'All Courses',
  'React Development',
  'Node.js Development',
  'Python Development',
  'Java Development',
  'Full Stack Development',
  'Web Development',
];

const GENDER_OPTIONS = ['All', 'Male', 'Female', 'Other'];
const STATUS_OPTIONS = ['All', 'Active', 'Inactive'];

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'age-asc', label: 'Age: Low to High' },
  { value: 'age-desc', label: 'Age: High to Low' },
  { value: 'date-desc', label: 'Newest Enrollment' },
  { value: 'date-asc', label: 'Oldest Enrollment' },
];

const SearchFilterBar = ({
  searchTerm,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  selectedGender,
  onGenderChange,
  selectedStatus,
  onStatusChange,
  selectedCity,
  onCityChange,
  availableCities = [],
  sortBy,
  onSortChange,
  onClearFilters,
  isFiltered,
}) => {
  return (
    <div className="filter-bar-card">
      <div className="filter-controls-grid">
        {/* Real-time Search Input */}
        <div className="search-input-wrapper">
          <span className="search-icon-inside">
            <SearchIcon size={18} />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, course, or city..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search students"
          />
        </div>

        {/* Course Filter */}
        <select
          className="filter-select"
          value={selectedCourse}
          onChange={(e) => onCourseChange(e.target.value)}
          aria-label="Filter by course"
        >
          {COURSE_OPTIONS.map((course) => (
            <option key={course} value={course === 'All Courses' ? 'All' : course}>
              {course}
            </option>
          ))}
        </select>

        {/* Gender Filter */}
        <select
          className="filter-select"
          value={selectedGender}
          onChange={(e) => onGenderChange(e.target.value)}
          aria-label="Filter by gender"
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Status Filter */}
        <select
          className="filter-select"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Dynamic City Filter */}
        <select
          className="filter-select"
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          aria-label="Filter by city"
        >
          <option value="All">All Cities</option>
          {availableCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Sort Select */}
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort students"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {isFiltered && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onClearFilters}
            title="Reset all filters and search"
          >
            <RefreshIcon size={14} />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;
