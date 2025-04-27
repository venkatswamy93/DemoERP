import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Svg, Path } from '@react-pdf/renderer';
import logo from '../../src/images/logo.png'


const styles = StyleSheet.create({
  pageWrapper: { padding: 10, backgroundColor: '#FAF3E0' },
  page: { padding: 20, fontFamily: 'Helvetica', backgroundColor: '#FFFFFF' },

  header: {
    fontSize: 20, textAlign: 'center', marginBottom: 10, fontWeight: 'bold', color: '#D87A2D'
  },

  sectionHeader: {
    fontSize: 14, marginTop: 14, marginBottom: 6, fontWeight: 'bold',
    color: '#197278', textDecoration: 'underline'
  },

  section: { fontSize: 11, marginBottom: 6, color: '#333' },

  table: {
    display: 'table', width: '100%', marginTop: 8, fontSize: 10
  },

  tableRow: {
    flexDirection: 'row', backgroundColor: '#FBE8D3'
  },

  tableCell: {
    flex: 1, padding: 6, borderBottom: '0.5px solid #aaa', textAlign: 'center'
  },

  summaryTable: {
    marginTop: 20, width: '100%', fontSize: 11
  },

  summaryRow: {
    flexDirection: 'row', borderBottom: '0.5px solid #aaa', paddingVertical: 4
  },

  summaryCell: {
    flex: 1, textAlign: 'center', fontWeight: 'bold'
  },

  logo: {
    width: 75, height: 75, marginBottom: 10, alignSelf: 'center'
  },

  footer: {
    marginTop: 20, fontSize: 10, textAlign: 'center', color: '#777'
  }
});

// Pie Chart Helpers
const generatePieChartData = (rooms) => {
  const colors = ['#E67E22', '#1C758A', '#D87A2D', '#F4C724', '#8E44AD', '#2ECC71', '#16A085'];
  const total = rooms.reduce((sum, room) => sum + room.totalPrice, 0);
  let cumulativeAngle = 0;

  return rooms.map((room, index) => {
    const angle = (room.totalPrice / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    return {
      startAngle,
      endAngle,
      color: colors[index % colors.length],
      name: room.name,
      percentage: ((room.totalPrice / total) * 100).toFixed(2)
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
      key={`${startAngle}-${endAngle}`}
      d={`M100,100 L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`}
      fill={color}
    />
  );
};

const QuotationPDF = ({ customer, rooms, summary }) => {
  const pieData = generatePieChartData(summary.rooms);
  const filteredRooms = rooms.filter(room => room.items && room.items.length > 0);

  return (
    <Document>

      {/* Page 1 - Company and Customer Info */}
      <Page size="A4" style={styles.pageWrapper}>
  <View style={styles.page}>
    <Image style={styles.logo} src={logo} />
    <Text style={styles.header}>Customer Quotation</Text>
    <Text style={styles.section}>Date: {new Date().toLocaleDateString()}</Text>

    <Text style={styles.sectionHeader}>Customer Information</Text>
    <Text style={styles.section}>Name: {customer.name}</Text>
    <Text style={styles.section}>Address: {customer?.address || 'NA'}</Text>
    <Text style={styles.section}>Phone: {customer.phone}</Text>
    <Text style={styles.section}>Email: {customer.email}</Text>

    <Text style={styles.sectionHeader}>About MN Design Solutions</Text>
    <Text style={styles.section}>
      At MN Design Solutions, we don’t just design spaces; we transform them into personalized havens that are as functional as they are beautiful. As a young and dynamic start-up in the interior design industry, we bring a fresh perspective to every project. Our mission is to deliver high-quality, tailored interior solutions that reflect your unique style, needs, and preferences.
    </Text>
    <Text style={styles.section}>
      With a team of experienced designers, we are committed to creating exceptional interiors that enhance your lifestyle. We blend creativity with practicality, ensuring that each project is completed on time and within budget. Whether you need bespoke design services for residential, commercial, or modular interiors, we are here to make your vision a reality.
    </Text>

    <Text style={styles.sectionHeader}>Why Choose Us?</Text>
    <Text style={styles.section}>- **Competitive Pricing**: Get the best value for your investment with affordable, high-quality solutions.</Text>
    <Text style={styles.section}>- **Bespoke, Creative Designs**: Our designs are customized to meet your unique requirements, blending aesthetics and functionality seamlessly.</Text>
    <Text style={styles.section}>- **Guaranteed Project Completion**: We value your time. Our projects are completed in 45-60 days, guaranteed, without compromising on quality.</Text>
    <Text style={styles.section}>- **Trusted Partnerships**: We collaborate with top-tier, premium brands to ensure that only the best materials and products are used in your project.</Text>
    <Text style={styles.section}>- **Dedicated Project Management**: From the initial consultation to project completion, our dedicated project managers will be with you every step of the way, ensuring smooth and timely execution.</Text>
    <Text style={styles.section}>- **Transparent Communication**: We believe in clear, open communication throughout the entire process. Our team is always available to answer your questions and provide updates.</Text>

    <Text style={styles.sectionHeader}>Our Expertise</Text>
    <Text style={styles.section}>
      While our primary focus is on innovative design, we understand that execution is key to the success of any interior project. Our expertise extends beyond just creating beautiful designs – we also ensure that the execution of your design is carried out to perfection. If you are working with carpenters or external vendors, we offer guidance to make sure the design is implemented as planned. Our team works closely with your vendors to guarantee the highest standards of craftsmanship and attention to detail are met.
    </Text>
    <Text style={styles.section}>
      We take pride in our ability to bring designs to life in collaboration with trusted professionals, ensuring that the final result is as seamless and flawless as envisioned. With MN Design Solutions, you can rest assured that your project will be handled with the utmost care, expertise, and dedication.
    </Text>
  </View>
</Page>



      {/* Page 2 - Summary + Pie Chart */}
      <Page size="A4" style={styles.pageWrapper}>
        <View style={styles.page}>
          <Image style={styles.logo} src={logo} />
          <Text style={styles.sectionHeader}>Quotation Summary</Text>

          <View style={styles.summaryTable}>
            {summary.rooms.map((room, idx) => (
              <View key={idx} style={styles.summaryRow}>
                <Text style={styles.summaryCell}>{room.name}</Text>
                <Text style={styles.summaryCell}>{Number(room.totalPrice || 0).toLocaleString('en-IN')}</Text>
              </View>
            ))}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryCell}>Total</Text>
              <Text style={styles.summaryCell}>{Number(summary.total || 0).toLocaleString('en-IN')}</Text>
            </View>

            {(Number(summary.discount) !== 0 || Number(summary.gst) !== 0) && (
              <>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryCell}>Discount @ {summary.discountPercentage}%</Text>
                  <Text style={styles.summaryCell}>{Number(summary.discount || 0).toLocaleString('en-IN')}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryCell}>Subtotal</Text>
                  <Text style={styles.summaryCell}>{Number(summary.subtotal || 0).toLocaleString('en-IN')}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryCell}>GST @ {summary.gstPercentage}%</Text>
                  <Text style={styles.summaryCell}>{Number(summary.gst || 0).toLocaleString('en-IN')}</Text>
                </View>
              </>
            )}

            <View style={styles.summaryRow}>
              <Text style={styles.summaryCell}>Total Payable</Text>
              <Text style={styles.summaryCell}>{Number(summary.totalPayable || 0).toLocaleString('en-IN')}</Text>
            </View>
          </View>

          {/* Pie Chart */}
          <Text style={styles.sectionHeader}>Chart Overview</Text>
          <Svg width="200" height="200" viewBox="0 0 200 200">
            {pieData.map((slice) => createPieSlice(slice.startAngle, slice.endAngle, slice.color))}
          </Svg>

          {/* Legend */}
          {pieData.map((slice, idx) => (
            <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <View style={{ width: 12, height: 12, backgroundColor: slice.color, marginRight: 6 }} />
              <Text style={{ fontSize: 10 }}>{slice.name}: {slice.percentage}%</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* Page 3+ Room Wise Details (one room per table) */}
      <Page size="A4" style={styles.pageWrapper}>
      <View style={styles.pages}>
      <Image style={styles.logo} src={logo} />
  {filteredRooms.map((room, rIdx) => {
    // Calculate total cost of the room
    const totalRoomCost = room.items.reduce((sum, item) => {
      const qty = (Number(item.length) * Number(item.height)) / 90000;
      const itemTotal = qty * item.price;
      return sum + itemTotal;
    }, 0);

    return (
      <View key={rIdx} style={styles.page}>
        <Text style={styles.sectionHeader}>{room.name} Details</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>S.No</Text>
            <Text style={styles.tableCell}>Item</Text>
            <Text style={styles.tableCell}>Material</Text>
            <Text style={styles.tableCell}>Qty (SFT)</Text>
            <Text style={styles.tableCell}>Price</Text>
          </View>

          {room.items.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{idx + 1}</Text>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.material}</Text>
              <Text style={styles.tableCell}>
                {((Number(item.length) * Number(item.height)) / 90000).toFixed(2)}
              </Text>
              <Text style={styles.tableCell}>
                {(
                  ((Number(item.length) * Number(item.height)) / 90000) *
                  item.price
                )
                  .toFixed(2)
                  .toLocaleString('en-IN')}
              </Text>
            </View>
          ))}

          {/* Total Room Cost Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Total</Text>
            <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>
              {totalRoomCost.toFixed(2).toLocaleString('en-IN')}
            </Text>
          </View>
        </View>
      </View>
    );
  })}
  </View>
</Page>

      {/* Final Page - Payment Terms */}
      <Page size="A4" style={styles.pageWrapper}>
  <Image style={styles.logo} src={logo} />

  <View style={styles.page}>
    <Text style={styles.sectionHeader}>Payment Terms</Text>
    <Text style={styles.section}>
      At MN Design Solutions, we aim to provide a transparent and smooth process for our valued customers. The following payment terms apply to all projects, ensuring that we maintain a clear understanding of the financial expectations throughout the duration of the project.
    </Text>
    
    <Text style={styles.section}>1. **10% Booking Amount**: A booking amount is required to confirm your project. This ensures that we reserve time and resources for your project.</Text>
    <Text style={styles.section}>2. **50% On Agreement**: Upon signing the agreement, a 50% advance payment is required. This amount covers the initial stages of the project, including design work and procurement of materials.</Text>
    <Text style={styles.section}>3. **40% Before Delivery**: The remaining 40% is due before the final delivery and installation of your project. This ensures that all materials and labor are covered before completion.</Text>
    <Text style={styles.section}>4. **No Refund after Booking**: Please note that the booking amount is non-refundable once the project has been initiated. This helps us cover initial design costs and any resources already committed to your project.</Text>

    <Text style={styles.section}>
      We believe that clear and fair payment terms are essential for a smooth and mutually beneficial relationship. Our team is always available to discuss any concerns or questions you may have regarding the payment schedule.
    </Text>

    <Text style={styles.footer}>Thank you for choosing MN Design Solutions Interiors! We look forward to bringing your vision to life with our expertise and dedication.</Text>
  </View>
</Page>


    </Document>
  );
};

export default QuotationPDF;
