import React from 'react';
import { AlertCircleIcon, RefreshIcon } from './Icons';
import '../styles/components/ErrorMessage.css';

const ErrorMessage = ({
  title = 'API Connection Error',
  message = 'Unable to connect to the student API. Please make sure JSON Server is running.',
  onRetry = null,
}) => {
  return (
    <div className="error-card" role="alert">
      <div className="error-icon">
        <AlertCircleIcon size={38} />
      </div>
      <h3 className="error-title">{title}</h3>
      <p className="error-desc">{message}</p>
      
      {/* Troubleshooting guide when server is down */}
      <div className="error-troubleshooting">
        <strong>Troubleshooting Tip:</strong>
        <p className="error-troubleshooting-text">
          Start the local API backend by opening a terminal and running:
        </p>
        <code className="error-command">
          npm run server
        </code>
      </div>

      {onRetry && (
        <button type="button" className="btn btn-primary btn-sm error-retry" onClick={onRetry}>
          <RefreshIcon size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
