import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  pageWrapper: {
    padding: 5, // Outer padding
    border: '3px solid black', // Outer border
  },
  page: {
    padding: 30, // Inner padding
    fontFamily: 'Helvetica',
    border: '2px solid black', // Inner border
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#D32F2F', // Light Red Color
  },
  sectionHeader: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#D32F2F', // Light Red Color
  },
  section: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: '100%',
    border: '1 solid black',
    marginTop: 10,
    backgroundColor: '#E8E7E4', // Light Yellow Background
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid black',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
    borderRight: '1 solid black',
    color: '#f40303', // Light Blue Text Color
  },
  summaryTable: {
    marginTop: 20,
    width: '100%',
    border: '1 solid black',
  },
  summaryTableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid black',
  },
  summaryTableCell: {
    padding: 5,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
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

const QuotationPDF = ({ customer, rooms, summary }) => {
  return (
    <Document>
      {/* Introduction Page */}
      <Page size="A4" style={styles.pageWrapper}>
        <View style={styles.page}>
          <Text style={styles.header}>Customer Quotation</Text>
          <Text style={styles.section}>Date: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.sectionHeader}>Customer Information</Text>
          {console.log(customer, rooms, summary)}
          <Text style={styles.section}>Name: {customer.name}</Text>
          <Text style={styles.section}>Address: {customer?.address || 'NA'}</Text>
          <Text style={styles.section}>Phone: {customer.phone}</Text>
          <Text style={styles.section}>Email: {customer.email}</Text>
        </View>
      </Page>

      {/* Quotation Summary Table */}
      <Page size="A4" style={styles.pageWrapper}>
        <View style={styles.page}>
          <Text style={styles.sectionHeader}>Quotation Summary</Text>
          <View style={styles.summaryTable}>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>Room</Text>
              <Text style={styles.summaryTableCell}>Total Price</Text>
            </View>
            {summary.rooms.map((room, idx) => (
              <View key={idx} style={styles.summaryTableRow}>
                <Text style={styles.summaryTableCell}>{room.name}</Text>
                <Text style={styles.summaryTableCell}>{room.totalPrice}</Text>
              </View>
            ))}
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>Total</Text>
              <Text style={styles.summaryTableCell}>{summary.total}</Text>
            </View>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>Discount @ {summary.discountPercentage}%</Text>
              <Text style={styles.summaryTableCell}> {summary.discount}</Text>
            </View>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>Subtotal</Text>
              <Text style={styles.summaryTableCell}> {summary.subtotal}</Text>
            </View>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>GST @ {summary.gstPercentage}%</Text>
              <Text style={styles.summaryTableCell}> {summary.gst}</Text>
            </View>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>Total Payable</Text>
              <Text style={styles.summaryTableCell}> {summary.totalPayable}</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Detailed Room-wise Quotation */}
      {rooms.map((room, index) => (
        <Page size="A4" key={index} style={styles.pageWrapper}>
          <View style={styles.page}>
            <Text style={styles.sectionHeader}>{room.name} Quotation</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Item</Text>
                <Text style={styles.tableCell}>Material</Text>
                <Text style={styles.tableCell}>Quantity</Text>
                <Text style={styles.tableCell}>Price</Text>
              </View>
              {room.items.map((item, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.name}</Text>
                  <Text style={styles.tableCell}>{item.material}</Text>
                  {console.log(item)}
                  <Text style={styles.tableCell}>
                    {(parseFloat((Number(item.length) * Number(item.height)) / 90000)).toFixed(2) + ' SFT'}
                  </Text>
                  <Text style={styles.tableCell}>
                    {parseFloat(((Number(item.length) * Number(item.height)) / 90000) * item.price).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      ))}

      {/* Payment Details & Terms */}
      <Page size="A4" style={styles.pageWrapper}>
        <View style={styles.page}>
          <Text style={styles.sectionHeader}>Payment Schedule</Text>
          <Text style={styles.section}>1. 10% for design meetings & booking confirmation.</Text>
          <Text style={styles.section}>2. 50% upon contract signing.</Text>
          <Text style={styles.section}>3. 40% before furniture delivery.</Text>
          <Text style={styles.section}>4. Payments are non-refundable.</Text>
          <Text style={styles.section}>5. Minimum project value:  4,00,000 (Excluding GST).</Text>

          <Text style={styles.sectionHeader}>Bank Details</Text>
          <Text style={styles.section}>A/c Name: DEMO Design Solutions Pvt Ltd</Text>
          <Text style={styles.section}>Bank: HDFC Bank</Text>
          <Text style={styles.section}>A/c Type: Current Account</Text>
          <Text style={styles.section}>UPI ID: DEMO@hdfcbank</Text>

          <Text style={styles.footer}>Thank you for choosing our services. We look forward to working with you!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default QuotationPDF;
