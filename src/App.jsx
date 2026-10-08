import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';

// Pages
import Home from './pages/Home';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import StudentDetails from './pages/StudentDetails';
import EditStudent from './pages/EditStudent';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar />

      {/* Global Notification Toast */}
      <Notification />

      {/* Main Routed Content */}
      <main className="main-content" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/students/edit/:id" element={<EditStudent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
};

export default App;
