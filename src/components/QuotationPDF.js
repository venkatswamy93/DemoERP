import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles for the document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    borderWidth: 1,
    borderColor: 'lightcoral', // Light red color border
    borderStyle: 'solid',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    borderBottom: '1 solid black',
    paddingBottom: 5,
  },
  sectionHeader: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    borderBottom: '1 solid black',
    paddingBottom: 5,
  },
  section: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    width: '100%',
    marginTop: 10,
    border: '1 solid black',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid black',
  },
  tableCell: {
    padding: 5,
    fontSize: 12,
    flex: 1,
    borderRight: '1 solid black',
  },
  tableHeaderCell: {
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    flex: 1,
    borderRight: '1 solid black',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10,
    borderTop: '1 solid black',
    paddingTop: 5,
  },
});

const QuotationPDF = ({ customer, rooms }) => (
  <Document>
    {/* First Page - Customer Info */}
    <Page style={styles.page}>
      <Text style={styles.header}>Customer Quotation</Text>
      <Text style={styles.section}>Date: {new Date().toLocaleDateString()}</Text>
      <Text style={styles.sectionHeader}>Customer Information</Text>
      <Text style={styles.section}>Customer Name: {customer.CXName}</Text>
      <Text style={styles.section}>Address: {customer.address}</Text>
      <Text style={styles.section}>Phone: {customer.phone}</Text>
      <Text style={styles.section}>Email: {customer.email}</Text>
    </Page>

    {/* Middle Pages - Room-wise Quotation */}
    {rooms.map((room, index) => (
      <Page key={index} style={styles.page}>
        <Text style={styles.sectionHeader}>{room.name} Quotation</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeaderCell}>Item</Text>
            <Text style={styles.tableHeaderCell}>Material</Text>
            <Text style={styles.tableHeaderCell}>Length</Text>
            <Text style={styles.tableHeaderCell}>Height</Text>
            <Text style={styles.tableHeaderCell}>Price</Text>
          </View>
          {room.items.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.material}</Text>
              <Text style={styles.tableCell}>{item.length}</Text>
              <Text style={styles.tableCell}>{item.height}</Text>
              <Text style={styles.tableCell}>₹{item.price}</Text>
            </View>
          ))}
        </View>
      </Page>
    ))}

    {/* Last Page - Annexure and Payment Details */}
    <Page style={styles.page}>
      <Text style={styles.sectionHeader}>ANNEXURE-1: Material Specification</Text>
      <Text style={styles.section}>1. Plywood (Dry Areas)</Text>
      <Text style={styles.section}>2. Plywood (Wet Areas)</Text>
      <Text style={styles.section}>3. Outer Laminate (1 MM)</Text>
      <Text style={styles.section}>4. Hardware</Text>
      <Text style={styles.section}>5. Glass</Text>

      <Text style={styles.sectionHeader}>Payment Details</Text>
      <Text style={styles.section}>A/c Name: Demo DESIGN SOLUTIONS PRIVATE LIMITED</Text>
      <Text style={styles.section}>Bank: HDFC Bank</Text>
      <Text style={styles.section}>A/c Type: Current Account</Text>
      <Text style={styles.section}>UPI ID: Demo@hdfcbank</Text>

      <Text style={styles.footer}>Thank you for choosing Interior for your design needs. We look forward to working with you!</Text>
    </Page>
  </Document>
);

export default QuotationPDF;
