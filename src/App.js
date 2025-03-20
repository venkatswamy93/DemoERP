import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CContainer, CRow, CCol } from '@coreui/react'; // Assuming you're using CoreUI
import Sidebar from './components/Sidebar'; // Your Sidebar component
import Dashboard from './components/Dashboard'; // Your Dashboard component
import Home from './components/Home'; // Your Home component
import Customers from './components/Customers'; // Your Customers component
import Login from './pages/Login'; // Your Login component
import Register from './pages/Register'; // Your Register component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the user is logged in

  // Function to handle login success
  const handleLogin = () => {
    setIsAuthenticated(true); // Set to true on successful login
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes (Login and Register) */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Dashboard, Home, Customers) */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <CContainer>
                <CRow>
                  <CCol>
                    <Sidebar />
                  </CCol>
                  <CCol xs={9} className="border m-5">
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
