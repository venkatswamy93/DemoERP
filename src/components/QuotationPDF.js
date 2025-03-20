import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image  } from '@react-pdf/renderer';

const logoBase64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNTAiPjx0ZXh0IHg9IjEwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjMwIiBmaWxsPSJibGFjayI+RGVtbyBJbnRlcmllb3JzPC90ZXh0Pjwvc3ZnPg==';
const styles = StyleSheet.create({
  pageWrapper: { padding: 10, border: '6px double #000', backgroundColor: '#FFFFFF' },
  page: { padding: 30, fontFamily: 'Helvetica', border: '2px solid #555', backgroundColor: '#FAFAFA' },
  header: { fontSize: 22, textAlign: 'center', marginBottom: 14, fontWeight: 'bold', color: '#B71C1C', textTransform: 'uppercase', borderBottom: '3px solid #222', paddingBottom: 6 },
  sectionHeader: { fontSize: 14, marginTop: 14, marginBottom: 6, fontWeight: 'bold', color: '#D32F2F', textDecoration: 'underline', textTransform: 'uppercase' },
  section: { fontSize: 12, marginBottom: 6, color: '#333' },
  advantagesContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  advantageBox: { flex: 1, padding: 8, border: '1px solid #555', textAlign: 'center', marginHorizontal: 4, fontWeight: 'bold' },
    sectionHeader: {
      fontSize: 14,
      marginTop: 14,
      marginBottom: 6,
      fontWeight: 'bold',
      color: '#D32F2F',
      textDecoration: 'underline',
      textTransform: 'uppercase',
    },
    section: {
      fontSize: 12,
      marginBottom: 6,
      color: '#333',
    },
    table: {
      display: 'table',
      width: '100%',
      border: '1 solid #555',
      marginTop: 12,
      backgroundColor: '#F4F4F4',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottom: '2px solid #777',
      backgroundColor: '#EAEAEA',
    },
    tableCell: {
      flex: 1,
      padding: 8,
      fontSize: 10,
      borderRight: '1 solid #777',
      color: '#222',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    summaryTable: {
      marginTop: 20,
      width: '100%',
      border: '2px solid #222',
      backgroundColor: '#c7c1c1',
    },
    summaryTableRow: {
      flexDirection: 'row',
      borderBottom: '1 solid #444',
    },
    summaryTableCell: {
      padding: 6,
      fontSize: 12,
      flex: 1,
      textAlign: 'center',
      borderRight: '1 solid #444',
      fontWeight: 'bold',
      color: '#333',
    },
    summaryTableRowHead:{
      flexDirection: 'row',
      borderBottom: '1 solid #444',
      backgroundColor: '#f07971',
    },
    footer: {
      marginTop: 25,
      textAlign: 'center',
      fontSize: 10,
      borderTop: '2px solid #222',
      paddingTop: 10,
      color: '#555',
      fontWeight: 'bold',
    },
    logo: {
      position: 'absolute',
      top: 15,
      left: 20,
      width: 70,
      height: 70,
    },
    divider: {
      borderBottom: '2px dashed #888',
      marginVertical: 10,
    }
  });

const QuotationPDF = ({ customer, rooms, summary }) => {
  return (
    <Document>
      {/* Introduction Page */}
      <Page size="A4" style={styles.pageWrapper}>
        <View style={styles.page}>
          <Image style={styles.logo} src={logoBase64} />
          <Text style={styles.header}>Customer Quotation</Text>
          <Text style={styles.section}>Date: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.sectionHeader}>Customer Information</Text>
          <Text style={styles.section}>Name: {customer.name}</Text>
          <Text style={styles.section}>Address: {customer?.address || 'NA'}</Text>
          <Text style={styles.section}>Phone: {customer.phone}</Text>
          <Text style={styles.section}>Email: {customer.email}</Text>
          
          {/* Additional Information */}
          <Text style={styles.sectionHeader}>About Demo Interiors</Text>
          <Text style={styles.section}>At Demo Interiors, our team of creative professionals ensures that designs are beautiful and functional.</Text>
          <Text style={styles.section}>We are pioneers with an in-house production unit, utilizing automation technology and innovation.</Text>
          <Text style={styles.section}>Our partnerships with quality brands like Hettich, Airolam/Stylam, etc., ensure best-in-class products.</Text>
          <Text style={styles.section}>With over 2000+ exquisitely designed homes, we are one of the fastest-growing design firms in Bangalore.</Text>
          <Text style={styles.section}>We take pride in our dedicated team, providing individual attention to all client needs, making every home a beautiful #demohome.</Text>
          <Text style={styles.section}>Visit our website www.demo.com for completed projects; we are sure you’ll love our work like many of our customers!</Text>
          
          {/* Advantages Section */}
          <Text style={styles.sectionHeader}>Demo Interiors Advantages</Text>
          <View style={styles.advantagesContainer}>
            <Text style={styles.advantageBox}>Unmatched Price</Text>
            <Text style={styles.advantageBox}>Creativity & Quality</Text>
            <Text style={styles.advantageBox}>Warranty</Text>
            <Text style={styles.advantageBox}>45-60 Days of Execution</Text>
          </View>
        </View>
      </Page>

      {/* Quotation Summary Table */}
      <Page size="A4" style={styles.pageWrapper}>
        <View style={styles.page}>
        <Image style={styles.logo} src={logoBase64} />
          <Text style={styles.sectionHeader}>Quotation Summary</Text>
          <View style={styles.summaryTable}>
            <View style={styles.summaryTableRowHead}>
              <Text style={styles.summaryTableCell}>Room</Text>
              <Text style={styles.summaryTableCell}>Total Price</Text>
            </View>
            {summary.rooms.map((room, idx) => (
              <View key={idx} style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>{room.name}</Text>
              <Text style={styles.summaryTableCell}>{Number(room.totalPrice || 0).toLocaleString('en-IN')}</Text>
            </View>
            ))}
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>Total</Text>
              <Text style={styles.summaryTableCell}>{Number(summary.total || 0).toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>Discount @ {summary.discountPercentage}%</Text>
              <Text style={styles.summaryTableCell}>{Number(summary.discount || 0).toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>Subtotal</Text>
              <Text style={styles.summaryTableCell}>{Number(summary.subtotal || 0).toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>GST @ {summary.gstPercentage}%</Text>
              <Text style={styles.summaryTableCell}>{Number(summary.gst || 0).toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>Total Payable</Text>
              <Text style={styles.summaryTableCell}>{Number(summary.totalPayable || 0).toLocaleString('en-IN')}</Text>
            </View>
            
          </View>
        </View>
      </Page>

      {/* Detailed Room-wise Quotation */}
      {rooms.map((room, index) => (
        <Page size="A4" key={index} style={styles.pageWrapper}>
          <View style={styles.page}>
          <Image style={styles.logo} src={logoBase64} />
            <Text style={styles.sectionHeader}>{room.name} Quotation</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
              <Text style={styles.tableCell}>S.No</Text>
                <Text style={styles.tableCell}>Item</Text>
                <Text style={styles.tableCell}>Material</Text>
                <Text style={styles.tableCell}>Quantity</Text>
                <Text style={styles.tableCell}>Price</Text>
              </View>
              {room.items.map((item, idx) => (
                <View key={idx} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{idx +1}</Text>
                  <Text style={styles.tableCell}>{item.name}</Text>
                  <Text style={styles.tableCell}>{item.material}</Text>
                  {console.log(item)}
                  <Text style={styles.tableCell}>
                    {(parseFloat((Number(item.length) * Number(item.height)) / 90000)).toFixed(2) + ' SFT'}
                  </Text>
                  <Text style={styles.tableCell}>
                  {Number(
  (parseFloat(((Number(item.length) * Number(item.height)) / 90000) * item.price).toFixed(2))
).toLocaleString('en-IN')}
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
        <Image style={styles.logo} src={logoBase64} />
          <Text style={styles.sectionHeader}>Payment Schedule</Text>
          <Text style={styles.section}>1. 10% for design meetings & booking confirmation.</Text>
          <Text style={styles.section}>2. 50% upon contract signing.</Text>
          <Text style={styles.section}>3. 40% before furniture delivery.</Text>
          <Text style={styles.section}>4. Payments are non-refundable.</Text>
          <Text style={styles.section}>5. Minimum project value:  4,00,000 (Excluding GST).</Text>

          <Text style={styles.sectionHeader}>Note : </Text>
          <Text style={styles.section}>1. Demo 10-Year's Warranty:</Text>
          <Text style={styles.section}>a) All your woodwork is covered under the Demo 10-year warranty. This safeguards you against any defect in
manufacturing or in installation workmanship.</Text>
          <Text style={styles.section}>b) Please refer to Demo standard terms and conditions document for further details.</Text>
          <Text style={styles.section}>a) Bank transfers,</Text>
          <Text style={styles.section}>b) UPI and</Text>
          <Text style={styles.section}>c) Cheque payments for 90% payment post the 10% Initial amount.</Text>
                
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
