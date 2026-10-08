import React from 'react';
import { useStudents } from '../context/StudentContext';
import { LogoIcon } from './Icons';
import '../styles/components/Footer.css';

const Footer = () => {
  const { error } = useStudents();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <LogoIcon size={18} />
          <span className="footer-name">StudentHub</span>
          <span className="footer-subtitle">— Student Management System</span>
        </div>

        <div className="footer-text">
          &copy; 2026 StudentHub. Built with React &amp; REST API. All rights reserved.
        </div>

        <div className="api-status-badge">
          <span className={`status-dot ${error ? 'offline' : ''}`} />
          <span>{error ? 'API Offline (Check JSON Server)' : 'REST API Connected'}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
