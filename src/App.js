import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CContainer, CRow, CCol } from '@coreui/react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Customers from './components/Customers';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state from localStorage on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle login success
  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true'); // Persist login
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear authentication state
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes (Login & Register) */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Dashboard, Home, Customers) */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <CContainer>
                <CRow>
                  <CCol md={3}>
                    <Sidebar onLogout={handleLogout} /> {/* Pass logout function */}
                  </CCol>
                  <CCol md={9} className="border m-5">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/customers" element={<Customers />} />
                    </Routes>
                  </CCol>
                </CRow>
              </CContainer>
            ) : (
              <Navigate to="/login" /> // Redirect to login if not authenticated
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
