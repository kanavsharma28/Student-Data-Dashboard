import React, { useEffect } from 'react';
import { AlertCircleIcon, CloseIcon } from './Icons';
import '../styles/components/Modal.css';

const Modal = ({
  isOpen,
  title = 'Confirm Action',
  message,
  studentName = '',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDangerous = true,
  isLoading = false,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={isLoading ? undefined : onCancel}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 id="modal-title" className="modal-title">
            <span className={`modal-alert-icon ${isDangerous ? 'danger' : 'primary'}`}>
              <AlertCircleIcon size={22} />
            </span>
            <span>{title}</span>
          </h3>
          <button
            type="button"
            className="btn-icon"
            onClick={onCancel}
            disabled={isLoading}
            aria-label="Close dialog"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p>{message || 'Are you sure you want to delete this student?'}</p>
          {studentName && (
            <p className="modal-student-name">
              Student: &ldquo;{studentName}&rdquo;
            </p>
          )}
          <p className="modal-warning">
            This action will permanently remove the record from the database.
          </p>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            className={`btn ${isDangerous ? 'btn-danger' : 'btn-primary'} btn-sm`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
