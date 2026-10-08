import React from 'react';
import { useStudents } from '../context/StudentContext';
import { CheckCircleIcon, AlertCircleIcon, InfoIcon, CloseIcon } from './Icons';
import '../styles/components/Notification.css';

const Notification = () => {
  const { notification, clearNotification } = useStudents();

  if (!notification) return null;

  const { type, message } = notification;

  return (
    <div className="notification-container" aria-live="assertive">
      <div className={`notification-toast ${type || 'info'}`}>
        <div>
          {type === 'success' && <CheckCircleIcon size={20} />}
          {type === 'error' && <AlertCircleIcon size={20} />}
          {type === 'info' && <InfoIcon size={20} />}
        </div>
        <div className="notification-msg">{message}</div>
        <button
          type="button"
          className="btn-icon notification-close"
          onClick={clearNotification}
          aria-label="Dismiss notification"
        >
          <CloseIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
