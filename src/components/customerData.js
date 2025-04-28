// customerData.js
import { db } from '../../src/firebaseConfig'; // Only db from your firebase config
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"; // Proper Firestore SDK

// Function to get customer data
export const getCustomerData = async () => {
  const customerCollection = collection(db, "customers");
  const customerSnapshot = await getDocs(customerCollection);
  const customerList = customerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return customerList;
};

// Function to add a new customer
export const addCustomer = async (newCustomer) => {
  const customerCollection = collection(db, "customers");
  await addDoc(customerCollection, { ...newCustomer, quotations: [] });
};

// Function to update customer quotations
export const updateCustomerQuotation = async (customerId, updatedQuotations) => {
  const customerRef = doc(db, "customers", customerId);
  await updateDoc(customerRef, { quotations: updatedQuotations });
};
