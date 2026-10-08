import React from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon, SearchIcon, UserPlusIcon, RefreshIcon } from './Icons';
import '../styles/components/EmptyState.css';

const EmptyState = ({
  isFilterActive = false,
  onClearFilters = null,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrap">
        {isFilterActive ? <SearchIcon size={30} /> : <UsersIcon size={30} />}
      </div>
      
      <h3 className="empty-title">
        {isFilterActive ? 'No students match your search.' : 'No students found.'}
      </h3>
      
      <p className="empty-desc">
        {isFilterActive
          ? 'Try adjusting your search query, or clear filters to see all available student records.'
          : 'Get started by adding your first student to the management system database.'}
      </p>

      {isFilterActive ? (
        onClearFilters && (
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClearFilters}>
            <RefreshIcon size={16} />
            <span>Clear Filters</span>
          </button>
        )
      ) : (
        <Link to="/students/add" className="btn btn-primary btn-sm">
          <UserPlusIcon size={16} />
          <span>Add New Student</span>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
