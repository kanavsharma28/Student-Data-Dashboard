import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import {
  UsersIcon,
  UserPlusIcon,
  BookOpenIcon,
  EyeIcon,
  CalendarIcon,
  MapPinIcon,
} from '../components/Icons';
import '../styles/pages/Home.css';

const Home = () => {
  const { students, loading, error, fetchStudents } = useStudents();

  // Dynamic Statistics calculated directly from API data
  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter(
      (s) => s.status?.toLowerCase() === 'active'
    ).length;
    const inactive = students.filter(
      (s) => s.status?.toLowerCase() === 'inactive'
    ).length;
    const uniqueCourses = new Set(students.map((s) => s.course).filter(Boolean));

    return {
      total,
      active,
      inactive,
      totalCourses: uniqueCourses.size,
    };
  }, [students]);

  // Dynamic Course distribution calculated directly from API data
  const courseDistribution = useMemo(() => {
    if (!students.length) return [];
    const counts = {};
    students.forEach((s) => {
      if (s.course) {
        counts[s.course] = (counts[s.course] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([course, count]) => ({
        course,
        count,
        percentage: Math.round((count / students.length) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [students]);

  // Recent 5 enrolled students from API data
  const recentStudents = useMemo(() => {
    return [...students]
      .sort((a, b) => new Date(b.enrollmentDate) - new Date(a.enrollmentDate))
      .slice(0, 5);
  }, [students]);

  if (loading) {
    return <Loader message="Loading dashboard metrics..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Could Not Connect to Database"
        message={error}
        onRetry={fetchStudents}
      />
    );
  }

  return (
    <div className="home-dashboard">
      {/* Welcome Banner */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <h1>Welcome back</h1>
          <p>
            Manage your students efficiently from one place. Track enrollments,
            analyze course statistics, and oversee student records seamlessly.
          </p>
        </div>

        <div className="hero-actions">
          <Link to="/students/add" className="btn btn-primary">
            <UserPlusIcon size={18} />
            <span>+ Add New Student</span>
          </Link>
          <Link to="/students" className="btn btn-secondary">
            <UsersIcon size={18} />
            <span>View All Students</span>
          </Link>
        </div>
      </section>

      {/* 4 Stat Metric Cards */}
      <section className="stat-grid" aria-label="Dashboard Key Metrics">
        {/* Total Students */}
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <UsersIcon size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Total Students</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>

        {/* Active Students */}
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <UsersIcon size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Active Students</span>
            <span className="stat-value">{stats.active}</span>
          </div>
        </div>

        {/* Inactive Students */}
        <div className="stat-card">
          <div className="stat-icon-wrapper red">
            <UsersIcon size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Inactive Students</span>
            <span className="stat-value">{stats.inactive}</span>
          </div>
        </div>

        {/* Total Courses */}
        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <BookOpenIcon size={24} />
          </div>
          <div className="stat-details">
            <span className="stat-label">Total Courses</span>
            <span className="stat-value">{stats.totalCourses}</span>
          </div>
        </div>
      </section>

      {/* Two Column Grid: Course Statistics & Recent Students */}
      <div className="dashboard-grid-two-col">
        {/* Course Statistics Panel */}
        <section className="panel-card" aria-label="Course Distribution">
          <div className="panel-header">
            <h2 className="panel-title">Course Enrollment Statistics</h2>
            <span className="dashboard-panel-meta">
              {stats.totalCourses} Active Courses
            </span>
          </div>

          <div className="course-stats-list">
            {courseDistribution.length === 0 ? (
              <p className="dashboard-empty-text">
                No course enrollments recorded yet.
              </p>
            ) : (
              courseDistribution.map((item) => (
                <div key={item.course} className="course-stat-item">
                  <div className="course-stat-info">
                    <span className="course-stat-name">{item.course}</span>
                    <span className="course-stat-count">
                      {item.count} students ({item.percentage}%)
                    </span>
                  </div>
                  <div className="course-progress-track">
                    <progress
                      className="course-progress-bar"
                      value={item.percentage}
                      max="100"
                      aria-label={`${item.course} enrollment ${item.percentage}%`}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recent Students Panel */}
        <section className="panel-card" aria-label="Recent Students">
          <div className="panel-header">
            <h2 className="panel-title">Recently Enrolled Students</h2>
            <Link to="/students" className="dashboard-view-all">
              View All &rarr;
            </Link>
          </div>

          <div className="recent-students-list">
            {recentStudents.length === 0 ? (
              <p className="dashboard-empty-text">
                No student records available.
              </p>
            ) : (
              recentStudents.map((student) => (
                <div key={student.id} className="recent-student-row">
                  <div className="recent-student-identity">
                    <div className="recent-student-avatar">
                      {student.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="recent-student-name">
                        {student.name}
                      </div>
                      <div className="recent-student-meta">
                        <span>{student.course}</span>
                        <span>&bull;</span>
                        <span>{student.city}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/students/${student.id}`}
                    className="action-btn view"
                    title="View Student"
                    aria-label={`View ${student.name}`}
                  >
                    <EyeIcon size={15} />
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
