import React, { useEffect, useState } from 'react';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CButton,
  CSidebarFooter
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { cilUser, cilSpeedometer, cilPuzzle, cilExitToApp } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication state from localStorage on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear authentication state
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <CSidebar unfoldable colorScheme="dark" className="custom-sidebar">
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="style">Demo</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Navigation</CNavTitle>
        
        <CNavItem href="/dashboard">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
        </CNavItem>

        <CNavGroup toggler={<><CIcon customClassName="nav-icon" icon={cilPuzzle} /> Customers</>}>
          <CNavItem href="/home">Under Working</CNavItem>
          <CNavItem href="/customers">Quotation</CNavItem>
        </CNavGroup>

        <CNavItem href="/logout" onClick={handleLogout}>
          <CIcon customClassName="nav-icon" icon={cilExitToApp} /> Logout
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
