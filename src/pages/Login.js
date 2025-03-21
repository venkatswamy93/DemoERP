import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
  CCardFooter,
  CLink,
  CCardText,
} from "@coreui/react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already authenticated (persist login state)
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      navigate("/dashboard"); // Redirect if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuthenticated", "true"); // Store auth state
      onLogin(); // Update app state
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <CContainer className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <CRow className="w-100 justify-content-center">
        <CCol md={5}>
          <CCard className="p-4 shadow-lg bg-white rounded">
            <CCardHeader className="text-center">Login</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleLogin}>
                <CFormInput
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <CFormInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <small className="text-danger">{error}</small>}
                <CButton color="primary" type="submit" className="w-100 mt-3">
                  Login
                </CButton>
              </CForm>
              <CButton
                color="secondary"
                className="w-100 mt-2"
                onClick={() => navigate("/register")}
              >
                Register
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Login;