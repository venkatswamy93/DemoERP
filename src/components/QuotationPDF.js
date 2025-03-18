import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles for the document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  section: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    width: '100%',
    borderBottom: 1,
    borderColor: '#000',
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderColor: '#000',
  },
  tableCell: {
    padding: 5,
    borderRight: 1,
    borderColor: '#000',
    fontSize: 12,
  },
  tableHeaderCell: {
    padding: 5,
    borderRight: 1,
    borderColor: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10,
  },
  annexure: {
    marginTop: 20,
    fontSize: 12,
  },
  annexureTable: {
    width: '100%',
    marginTop: 10,
    borderBottom: 1,
    borderColor: '#000',
  },
  annexureRow: {
    flexDirection: 'row',
  },
  annexureCell: {
    padding: 5,
    borderRight: 1,
    borderColor: '#000',
  },
  annexureHeader: {
    fontWeight: 'bold',
  },
});

const QuotationPDF = () => (
  <Document>
    <Page style={styles.page}>
      {/* Header Section */}
      <Text style={styles.header}>Customer Quotation</Text>
      <Text style={styles.section}>Date: {new Date().toLocaleDateString()}</Text>

      {/* Customer Information */}
      <Text style={styles.sectionHeader}>Customer Information</Text>
      <Text style={styles.section}>Customer Name: John Doe</Text>
      <Text style={styles.section}>Address: 123 Main Street, City, State</Text>
      <Text style={styles.section}>Phone: +91 98765 43210</Text>
      <Text style={styles.section}>Email: johndoe@example.com</Text>

      {/* Material Quality & Branding */}
      <Text style={styles.sectionHeader}>Material Quality & Branding</Text>
      <Text style={styles.section}>
        We use the highest quality materials, ensuring durability and style.
      </Text>
      <Text style={styles.section}>✔ Plywood - High-grade waterproof plywood</Text>
      <Text style={styles.section}>✔ Laminates - Branded 1mm & 0.8mm laminates</Text>
      <Text style={styles.section}>✔ Hardware - Hettich / Hafele / Blum</Text>
      <Text style={styles.section}>✔ Finishes - PU, Acrylic, Veneer, Melamine</Text>

      {/* Terms and Conditions */}
      <Text style={styles.sectionHeader}>Terms & Conditions</Text>
      <Text style={styles.section}>1. All prices are exclusive of GST (18%).</Text>
      <Text style={styles.section}>2. 50% Advance payment is required before work starts.</Text>
      <Text style={styles.section}>3. Project completion time: 4-6 weeks after site measurement.</Text>
      <Text style={styles.section}>4. Any design modifications post-approval may lead to extra charges.</Text>
      <Text style={styles.section}>5. Warranty covers only manufacturing defects.</Text>

      {/* Room-wise Quotation */}
      <Text style={styles.sectionHeader}>Room-wise Quotation</Text>
      {/* Example room items - Replace with dynamic room data */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Item Name</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Material</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Length</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Height</Text>
          <Text style={[styles.tableHeaderCell, { width: '20%' }]}>Price</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: '20%' }]}>Item 1</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>Plywood</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>10</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>20</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>₹500</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: '20%' }]}>Item 2</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>Laminates</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>5</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>15</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>₹400</Text>
        </View>
      </View>

      {/* Annexure (Material Specification and Payment Details) */}
      <Text style={styles.sectionHeader}>ANNEXURE-1: Material Specification</Text>
      <View style={styles.annexureTable}>
        <View style={styles.annexureRow}>
          <Text style={[styles.annexureCell, { width: '50%' }]}>S.No</Text>
          <Text style={[styles.annexureCell, { width: '50%' }]}>Particulars</Text>
        </View>
        <View style={styles.annexureRow}>
          <Text style={[styles.annexureCell, { width: '50%' }]}>1</Text>
          <Text style={[styles.annexureCell, { width: '50%' }]}>Plywood (Dry Areas)</Text>
        </View>
        <View style={styles.annexureRow}>
          <Text style={[styles.annexureCell, { width: '50%' }]}>2</Text>
          <Text style={[styles.annexureCell, { width: '50%' }]}>Plywood (Wet Areas)</Text>
        </View>
        <View style={styles.annexureRow}>
          <Text style={[styles.annexureCell, { width: '50%' }]}>3</Text>
          <Text style={[styles.annexureCell, { width: '50%' }]}>Outer Laminate (1 MM)</Text>
        </View>
        <View style={styles.annexureRow}>
          <Text style={[styles.annexureCell, { width: '50%' }]}>4</Text>
          <Text style={[styles.annexureCell, { width: '50%' }]}>Hardware</Text>
        </View>
        <View style={styles.annexureRow}>
          <Text style={[styles.annexureCell, { width: '50%' }]}>5</Text>
          <Text style={[styles.annexureCell, { width: '50%' }]}>Glass</Text>
        </View>
      </View>

      <Text style={styles.annexure}>Please issue A/c Payee cheques in the name of "SAMIKA DESIGN SOLUTIONS PRIVATE LIMITED".</Text>
      <Text style={styles.annexure}>You can also make an Online transaction to the below account details:</Text>
      <Text style={styles.annexure}>Bank: HDFC Bank, A/c Type: Current Account, UPI ID: DECR23GB0823179@hdfcbank</Text>

      {/* Footer */}
      <Text style={styles.footer}>Thank you for choosing Interior for your design needs. We look forward to working with you!</Text>
    </Page>
  </Document>
);

export default QuotationPDF;
