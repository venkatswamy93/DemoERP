// customerData.js (Modified)
import { db, collection, getDocs, addDoc, updateDoc, doc } from '../../src/firebaseConfig';

// Function to get customer data from Firestore
export const getCustomerData = async () => {
  const customerCollection = collection(db, "customers");
  const customerSnapshot = await getDocs(customerCollection);
  const customerList = customerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return customerList;
};

// Function to add a new customer to Firestore
export const addCustomer = async (newCustomer) => {
  const customerCollection = collection(db, "customers");
  await addDoc(customerCollection, { ...newCustomer, quotations: [] });
};

// Function to update customer quotations in Firestore
export const updateCustomerQuotation = async (customerId, updatedQuotations) => {
  const customerRef = doc(db, "customers", customerId);
  await updateDoc(customerRef, { quotations: updatedQuotations });
};
