import React from 'react';
import '../styles/components/Loader.css';

const Loader = ({ message = 'Loading students...' }) => {
  return (
    <div className="loader-container" role="status" aria-live="polite">
      <div className="spinner" />
      <p className="loader-text">{message}</p>
    </div>
  );
};

export default Loader;
