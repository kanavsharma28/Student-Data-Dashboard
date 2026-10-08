import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import '../styles/components/Pagination.css';

const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers array with ellipsis for larger sets
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('...');
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="pagination-container" aria-label="Pagination Navigation">
      <div className="pagination-info">
        Showing <span className="pagination-total">{startItem}</span> to{' '}
        <span className="pagination-total">{endItem}</span> of{' '}
        <span className="pagination-total">{totalItems}</span> students
      </div>

      <div className="pagination-pages">
        {/* Previous Button */}
        <button
          type="button"
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous Page"
        >
          <ChevronLeftIcon size={16} />
        </button>

        {/* Numbered Page Buttons */}
        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span
              key={`ellipsis-${idx}`}
              className="pagination-ellipsis"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          type="button"
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next Page"
        >
          <ChevronRightIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
