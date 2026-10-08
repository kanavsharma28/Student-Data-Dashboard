import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '../components/Icons';
import '../styles/pages/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container not-found-page" role="main">
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-desc">
        The page you are looking for does not exist, has been removed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary not-found-home-link">
        <HomeIcon size={18} />
        <span>Go to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
