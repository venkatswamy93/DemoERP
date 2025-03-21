import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from "../firebaseConfig";
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
  CModal,
  CModalBody,
  CModalFooter,
  CCardText,
} from "@coreui/react";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
  address: yup.string().required("Address is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });

      setModal(true); // Show success modal
    } catch (error) {
      console.error("Registration Error:", error.message);
    }
  };

  return (
    <CContainer className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <CRow className="w-100 justify-content-center">
        <CCol md={6}>
          <CCard className="p-3 shadow-lg bg-white rounded">
            <CCardHeader className="text-center fs-5 fw-bold">Welcome to Demo Interiors
            <CCardText className="text-center fs-10 fw-normal">Please Enter Details to Register</CCardText>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
                <CRow>
                  <CCol md={6}>
                    <CFormInput type="text" label="Full Name" {...register("name")} invalid={!!errors.name} />
                    {errors.name && <small className="text-danger">{errors.name.message}</small>}
                  </CCol>
                  <CCol md={6}>
                    <CFormInput type="email" label="Email Address" {...register("email")} invalid={!!errors.email} />
                    {errors.email && <small className="text-danger">{errors.email.message}</small>}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md={6}>
                    <CFormInput type="text" label="Phone Number" {...register("phone")} invalid={!!errors.phone} />
                    {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
                  </CCol>
                  <CCol md={6}>
                    <CFormInput type="text" label="Address" {...register("address")} invalid={!!errors.address} />
                    {errors.address && <small className="text-danger">{errors.address.message}</small>}
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md={6}>
                    <CFormInput type="password" label="Set Password" {...register("password")} invalid={!!errors.password} />
                    {errors.password && <small className="text-danger">{errors.password.message}</small>}
                  </CCol>
                  <CCol md={6}>
                    <CFormInput type="password" label="Confirm Password" {...register("confirmPassword")} invalid={!!errors.confirmPassword} />
                    {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
                  </CCol>
                </CRow>

                <CButton color="primary" type="submit" className="w-100">
                  Register
                </CButton>
              </CForm>
              <div className="text-center mt-3">
                <CButton color="secondary" onClick={() => navigate("/login")}>
                  Go to Login
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Success Modal */}
      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalBody className="text-center">Successfully Registered!</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => navigate("/login")}>
            Go to Login
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default Register;
