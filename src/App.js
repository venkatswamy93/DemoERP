import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CContainer, CRow, CCol } from '@coreui/react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Customers from './components/Customers';
import Login from './pages/Login';
import Register from './pages/Register';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './firebase'; // Make sure your firebase.js exports initialized app

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  // Function to handle login success
  const handleLogin = () => {
    // Firebase handles auth state, no need to manually set localStorage
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error('Sign-out error:', error);
      });
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
                    <Sidebar onLogout={handleLogout} />
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
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
