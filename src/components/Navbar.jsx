import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  LogoIcon,
  HomeIcon,
  UsersIcon,
  UserPlusIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon,
} from './Icons';
import '../styles/components/Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo & Title */}
        <Link to="/" className="brand-link" onClick={closeMobileMenu}>
          <div className="brand-icon-wrap">
            <LogoIcon size={24} />
          </div>
          <div className="brand-info">
            <span className="brand-title">StudentHub</span>
            <span className="brand-subtitle">Student Management System</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-links nav-links-desktop">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <HomeIcon size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/students"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <UsersIcon size={18} />
            <span>Students</span>
          </NavLink>

          <NavLink
            to="/students/add"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <UserPlusIcon size={18} />
            <span>Add Student</span>
          </NavLink>

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MoonIcon size={19} /> : <SunIcon size={19} />}
          </button>
        </nav>

        {/* Mobile Actions: Theme Toggle & Hamburger */}
        <div className="mobile-actions">
          <button
            type="button"
            className={`theme-toggle-btn ${mobileMenuOpen ? 'mobile-theme-visible' : ''}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon size={19} /> : <SunIcon size={19} />}
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={closeMobileMenu}
        >
          <HomeIcon size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/students"
          end
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={closeMobileMenu}
        >
          <UsersIcon size={18} />
          <span>Students</span>
        </NavLink>

        <NavLink
          to="/students/add"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={closeMobileMenu}
        >
          <UserPlusIcon size={18} />
          <span>Add Student</span>
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
