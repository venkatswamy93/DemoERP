import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Path, Svg } from '@react-pdf/renderer';
import '../../src/App.css';

const logoBase64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNTAiPjx0ZXh0IHg9IjEwIiB5PSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjMwIiBmaWxsPSJibGFjayI+RGVtbyBJbnRlcmllb3JzPC90ZXh0Pjwvc3ZnPg==';
const styles = StyleSheet.create({
  pageWrapper: { padding: 10, border: '6px double #E6A840', backgroundColor: '#FAF3E0' },
  page: { padding: 30, fontFamily: 'Helvetica', border: '2px solid #E6A840', backgroundColor: '#FFFFFF' },

  header: { 
    fontSize: 22, textAlign: 'center', marginBottom: 14, fontWeight: 'bold',
    color: '#D87A2D', textTransform: 'uppercase',
    borderBottom: '3px solid #333', paddingBottom: 6
  },

  sectionHeader: {
    fontSize: 14, marginTop: 14, marginBottom: 6, fontWeight: 'bold',
    color: '#197278', textDecoration: 'underline', textTransform: 'uppercase'
  },

  section: { fontSize: 12, marginBottom: 6, color: '#444' },

  advantagesContainer: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10
  },

  advantageBox: {
    flex: 1, padding: 5, border: '1px solid #D87A2D',
    textAlign: 'center', marginHorizontal: 4, fontWeight: 'bold',
    color: '#333', backgroundColor: '#F7E9D7'
  },

  table: {
    display: 'table', width: '100%', border: '1 solid #D87A2D', marginTop: 12,
    backgroundColor: '#FAF3E0'
  },

  tableRow: {
    flexDirection: 'row', borderBottom: '2px solid #E67E22', backgroundColor: '#FBE8D3'
  },

  tableCell: {
    flex: 1, padding: 8, fontSize: 10, borderRight: '1 solid #E67E22',
    color: '#333', fontWeight: 'bold', textAlign: 'center'
  },

  summaryTable: {
    marginTop: 20, width: '100%', border: '2px solid #333', backgroundColor: '#F5F5F5'
  },

  summaryTableRow: {
    flexDirection: 'row', borderBottom: '1 solid #777'
  },

  summaryTableCell: {
    padding: 6, fontSize: 12, flex: 1, textAlign: 'center',
    borderRight: '1 solid #777', fontWeight: 'bold', color: '#333'
  },

  summaryTableRowHead: {
    flexDirection: 'row', borderBottom: '1 solid #777',
    backgroundColor: '#D87A2D'
  },

  footer: {
    marginTop: 25, textAlign: 'center', fontSize: 10,
    borderTop: '2px solid #333', paddingTop: 10, color: '#555', fontWeight: 'bold'
  },

  logo: {
    position: 'absolute', top: 15, left: 20, width: 70, height: 70
  },

  divider: { borderBottom: '2px dashed #999', marginVertical: 10 },

  pieChartContainer: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30
  },

  pieText: {
    fontSize: 12, color: '#333', fontWeight: 'bold', textAlign: 'center'
  }
});

const generatePieChartData = (rooms) => {
  const colors = [
    '#E67E22', '#1C758A', '#D87A2D', '#F4C724', 
    '#8E44AD', '#2ECC71', '#F7E9D7', '#16A085'
  ];
  // pie chart data logic...
  const total = rooms.reduce((sum, room) => sum + room.totalPrice, 0);
  let cumulativeAngle = 0;

  return rooms.map((room, index) => {
    const value = room.totalPrice;
    const angle = (value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;
    const percentage = ((value / total) * 100).toFixed(2);

    return {
      startAngle,
      endAngle,
      color: colors[index % colors.length],
      name: room.name,
      value,
      totalPrice: total,
      percentage,
    };
  });
};


const createPieSlice = (startAngle, endAngle, color) => {
  const radius = 50;
  const radians = (angle) => (angle - 90) * (Math.PI / 180);
  const x1 = 100 + radius * Math.cos(radians(startAngle));
  const y1 = 100 + radius * Math.sin(radians(startAngle));
  const x2 = 100 + radius * Math.cos(radians(endAngle));
  const y2 = 100 + radius * Math.sin(radians(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return (
    <Path
      id='cube'
      key={`${startAngle}-${endAngle}`}
      d={`M100,100 L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`}
      fill={color}
    />
  );
};



const QuotationPDF = ({ customer, rooms, summary }) => {
  const pieData = generatePieChartData(summary.rooms);

  return (
    <Document>
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
           <Text style={styles.sectionHeader}>About MN Design Solutions Interiors</Text>
<Text style={styles.section}>
  At MN Design Solutions Interiors, we transform spaces into beautiful, functional homes tailored to your lifestyle. Our team of skilled designers and craftsmen combine creativity with practical expertise to deliver interiors that inspire.
</Text>
<Text style={styles.section}>
  As industry pioneers with our own in-house production unit, we leverage cutting-edge technology, automation, and innovative techniques to ensure precision, quality, and timely project execution.
</Text>
<Text style={styles.section}>
  We proudly collaborate with leading brands such as Hettich, Airolam, and Stylam to offer you the finest materials and finishes, delivering interiors that are both stylish and durable.
</Text>
<Text style={styles.section}>
  What sets us apart is our personalized service — every client is assigned a dedicated team, ensuring complete attention to detail and seamless execution from concept to completion.
</Text>
<Text style={styles.section}>
  Explore our completed projects at www.MNDesignSolutions.com and discover why hundreds of families trust us to design their dream homes.
</Text>

<Text style={styles.sectionHeader}>Why Choose MN Design Solutions Interiors?</Text>
<View style={styles.advantagesContainer}>
  <Text style={styles.advantageBox}>Unmatched Pricing & Value</Text>
  <Text style={styles.advantageBox}>Creative, Bespoke Designs</Text>
  <Text style={styles.advantageBox}>Assured 45-60 Day Project Completion</Text>
  <Text style={styles.advantageBox}>Premium Brand Partnerships</Text>
  <Text style={styles.advantageBox}>Dedicated Project Manager & Support Team</Text>
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
            {(Number(summary.discount) !== 0 || Number(summary.gst) !== 0) && (
  <>
    <View style={styles.summaryTableRow}>
      <Text style={styles.summaryTableCell}>
        Discount @ {summary.discountPercentage}%
      </Text>
      <Text style={styles.summaryTableCell}>
        {Number(summary.discount || 0).toLocaleString('en-IN')}
      </Text>
    </View>

    <View style={styles.summaryTableRow}>
      <Text style={styles.summaryTableCell}>Subtotal</Text>
      <Text style={styles.summaryTableCell}>
        {Number(summary.subtotal || 0).toLocaleString('en-IN')}
      </Text>
    </View>

    <View style={styles.summaryTableRow}>
      <Text style={styles.summaryTableCell}>
        GST @ {summary.gstPercentage}%
      </Text>
      <Text style={styles.summaryTableCell}>
        {Number(summary.gst || 0).toLocaleString('en-IN')}
      </Text>
    </View>
  </>
)}

            <View style={styles.summaryTableRow}>
              <Text style={styles.summaryTableCell}>Total Payable</Text>
              <Text style={styles.summaryTableCell}>{Number(summary.totalPayable || 0).toLocaleString('en-IN')}</Text>
            </View>
          </View>
          <Text style={styles.sectionHeader}>Quotation Summary : Chart View </Text>
        {/* Pie Chart */}
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 1 }}>
  <Svg width="300" height="300" viewBox="0 0 200 200">
    {pieData.map((slice) => createPieSlice(slice.startAngle, slice.endAngle, slice.color))}
  </Svg>
  
  {/* Legend */}
  <Text style={styles.sectionHeader}>Legend : </Text>
  <View style={{ marginTop: 1 }}>
    {pieData.map((slice, index) => (
      <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
        <View style={{
          width: 20,
          height: 20,
          backgroundColor: slice.color,
          marginRight: 10,
        }} />
        <Text style={{ fontSize: 12 }}>
          {slice.name}: {slice.percentage}%
        </Text>
      </View>
    ))}
  </View>
</View>
        </View>
      </Page>

      {/* Additional pages for room-wise quotations */}
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
                  <Text style={styles.tableCell}>{idx + 1}</Text>
                  <Text style={styles.tableCell}>{item.name}</Text>
                  <Text style={styles.tableCell}>{item.material}</Text>
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
          <Text style={styles.section}>5. Minimum project value: 4,00,000 (Excluding GST).</Text>
{/* 
          <Text style={styles.sectionHeader}>Note :</Text>
          <Text style={styles.section}>1. MN Design Solutions 5-Year's Warranty (From Factory Team):</Text>
          <Text style={styles.section}>a) All your woodwork is covered under the MN Design Solutions 10-year warranty. This safeguards you against any defect in manufacturing or in installation workmanship.</Text>
          <Text style={styles.section}>b) Please refer to MN Design Solutions standard terms and conditions document for further details.</Text>
          <Text style={styles.section}>a) Bank transfers,</Text>
          <Text style={styles.section}>b) UPI and</Text>
          <Text style={styles.section}>c) Cheque payments for 90% payment post the 10% Initial amount.</Text> */}

          {/* <Text style={styles.sectionHeader}>Bank Details</Text>
          <Text style={styles.section}>A/c Name: MN Design Solutions Design Solutions Pvt Ltd</Text>
          <Text style={styles.section}>Bank: HDFC Bank</Text>
          <Text style={styles.section}>A/c Type: Current Account</Text> */}
          {/* <Text style={styles.section}>UPI ID: MN Design Solutions@hdfcbank</Text> */}

          <Text style={styles.footer}>Thank you for choosing our services. We look forward to working with you!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default QuotationPDF;
