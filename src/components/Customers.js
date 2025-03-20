import React, { useEffect, useState } from "react";
import ReuseTable from "./ReuseTable";
import { getCustomerData, addCustomer, updateCustomerQuotation } from "./customerData";
import { pdf } from '@react-pdf/renderer';
import QuotationPDF from './QuotationPDF';
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CRow,
  CNav,
  CNavItem,
  CTabContent,
  CTabPane,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import * as XLSX from "xlsx";

const roomsList = [
  "Living", "Dining", "MBR", "KBR", "CBR", "PBR", "GBR", "Bedroom1",
  "Bedroom2", "Bedroom3", "Bedroom4", "Kitchen", "Utility", "Washroom",
  "Study Room", "Foyer", "Balcony"
];

const Customers = () => {
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState({ CXName: "", Property: "", Budget: "" });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [roomQuotations, setRoomQuotations] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [addedRooms, setAddedRooms] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", material: "", length: 0, height: 0, price: 0 });
  const [editingItem, setEditingItem] = useState(null);

  const [gstPercentage, setGstPercentage] = useState(18);  // Default GST Percentage
  const [discountPercentage, setDiscountPercentage] = useState(13);  // Default Discount Percentage

  useEffect(() => {
    const fetchData = async () => {
      const customerData = await getCustomerData();
      setData(customerData);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleEditQuotationItem = (index) => {
    const item = roomQuotations[activeTab][index];
    setNewItem(item);
    setEditingItem(index);
  };

  const handleDeleteQuotationItem = (index) => {
    const updatedRoom = roomQuotations[activeTab].filter((item, i) => i !== index);
    setRoomQuotations({ ...roomQuotations, [activeTab]: updatedRoom });
  };

  const handleDownloadExcel = () => {
    const wsData = [];
    wsData.push(["Room", "Item Name", "Material", "Length", "Height", "Price", "Total"]);

    addedRooms.forEach((room) => {
      const roomItems = roomQuotations[room];
      if (roomItems && roomItems.length > 0) {
        roomItems.forEach(item => {
          wsData.push([room, item.name, item.material, item.length, item.height, item.price, ((item.length * item.height) / 90000) * item.price]);
        });
      }
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quotation");
    XLSX.writeFile(wb, "Customer_Quotation.xlsx");
  };

  const handleDownload = () => {
    if (!selectedCustomer || addedRooms.length === 0) return;

    const calculateRoomTotal = (room) => {
      return room.items.reduce((sum, item) => {
        const { length, height, price } = item;
        const roomPrice = ((length * height) / 90000) * price;
        return sum + parseFloat(roomPrice.toFixed(2));
      }, 0);
    };

    const calculateTotalPrice = (rooms) => {
      return rooms.reduce((sum, room) => sum + calculateRoomTotal(room), 0);
    };

    const formattedCustomer = {
      name: selectedCustomer.CXName,
      address: selectedCustomer.Property,
      phone: "N/A",
      email: "N/A"
    };

    const formattedRooms = addedRooms.map(room => ({
      name: room,
      items: roomQuotations[room] || []
    }));

    const roomTotalPrice = calculateTotalPrice(formattedRooms);

    const discount = parseFloat(roomTotalPrice * (discountPercentage / 100)).toFixed(2);
    const subtotal = parseFloat(roomTotalPrice - discount).toFixed(2);
    const gst = parseFloat(roomTotalPrice * (gstPercentage / 100)).toFixed(2);
    const totalPayable = parseFloat(subtotal + gst).toFixed(2);

    const summary = {
      rooms: formattedRooms.map(room => ({
        name: room.name,
        totalPrice: calculateRoomTotal(room)
      })),
      total: roomTotalPrice,
      discountPercentage,
      discount,
      subtotal,
      gstPercentage,
      gst,
      totalPayable
    };

    pdf(<QuotationPDF customer={formattedCustomer} rooms={formattedRooms} summary={summary} />)
      .toBlob()
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Customer_Quotation.pdf';
        link.click();
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.CXName || !customer.Property || !customer.Budget) {
      alert("Please fill in all required fields.");
      return;
    }
    await addCustomer(customer);
    const updatedData = await getCustomerData();
    setData(updatedData);
    setCustomer({ CXName: "", Property: "", Budget: "" });
  };

  const handleUpdateClick = (index) => {
    const selectedCustomer = data[index];
    setSelectedCustomer({ ...selectedCustomer, index });
    setRoomQuotations({});
    setAddedRooms([]);
    setShowModal(true);

    selectedCustomer.quotations?.forEach((quotation) => {
      setAddedRooms((prevRooms) => [...prevRooms, quotation.room]);
      setRoomQuotations((prev) => ({ ...prev, [quotation.room]: quotation.items }));
    });
  };

  const handleAddRoom = (room) => {
    if (room && !addedRooms.includes(room)) {
      setAddedRooms([...addedRooms, room]);
      setRoomQuotations({ ...roomQuotations, [room]: [] });
      setActiveTab(room);
    }
  };

  const handleAddQuotationItem = () => {
    if (!newItem.name || newItem.length <= 0 || newItem.height <= 0 || newItem.price <= 0) {
      alert("Please fill in all fields before adding the item.");
      return;
    }

    if (editingItem !== null) {
      const updatedRoom = [...roomQuotations[activeTab]];
      updatedRoom[editingItem] = { ...newItem };
      setRoomQuotations({ ...roomQuotations, [activeTab]: updatedRoom });
      setEditingItem(null);
    } else {
      const updatedRoom = [...(roomQuotations[activeTab] || []), { ...newItem }];
      setRoomQuotations({ ...roomQuotations, [activeTab]: updatedRoom });
    }

    setNewItem({ name: "", material: "", length: 0, height: 0, price: 0 });
  };

  const handleSaveQuotation = async () => {
    if (!selectedCustomer) return;

    const updatedCustomer = {
      ...selectedCustomer,
      quotations: Object.entries(roomQuotations).map(([room, items]) => ({
        room,
        items,
        totalRoomPrice: items.reduce((total, item) => total + (item.length * item.height * item.price), 0)
      })),
      totalPrice: Object.values(roomQuotations).reduce((total, items) =>
        total + items.reduce((sum, item) => sum + (item.length * item.height * item.price), 0),
        0)
    };

    await updateCustomerQuotation(selectedCustomer.id, updatedCustomer.quotations);
    const updatedData = await getCustomerData();
    setData(updatedData);

    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <CRow>
        <CCol>
          <h2>Customer Management</h2>
          <CForm onSubmit={handleSubmit} className="m-2">
            <CRow>
              <CCol><CFormInput type="text" name="CXName" placeholder="Customer Name" value={customer.CXName} onChange={handleChange} required /></CCol>
              <CCol><CFormInput type="text" name="Property" placeholder="Property Name" value={customer.Property} onChange={handleChange} required /></CCol>
              <CCol><CFormInput type="text" name="Budget" placeholder="Budget" value={customer.Budget} onChange={handleChange} required /></CCol>
              <CCol><CButton color="success" type="submit">Add Customer</CButton></CCol>
            </CRow>
          </CForm>
        </CCol>
      </CRow>

      <h2>Customers</h2>
      <ReuseTable data={data.map((customer, index) => ({
        ...customer,
        CXLatestQuotation: customer.quotations?.slice(-1)[0]?.totalPrice || "N/A ₹",
        CXUpdateQuotationLink: () => handleUpdateClick(index)
      }))} />

      <CModal fullscreen visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Update Quotation</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
          <CRow>
            <CCol xl={3}>
              <CFormSelect className="m-1" onChange={(e) => handleAddRoom(e.target.value)}>
                <option value="">Select Room to Add</option>
                {roomsList.map((room) => (
                  <option className="m-2" key={room} value={room}>{room}</option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol xl={3}>
              <h6>Add Percentage</h6>
              <CFormInput
                className="m-1"
                type="number"
                name="gstPercentage"
                value={gstPercentage}
                onChange={(e) => setGstPercentage(parseFloat(e.target.value))}
                placeholder="GST (%)"
              />
              <h6>Add Discount</h6>
              <CFormInput
                className="m-1"
                type="number"
                name="discountPercentage"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(parseFloat(e.target.value))}
                placeholder="Discount (%)"
              />
            </CCol>
          </CRow>

          <nav>
            <div className="nav nav-tabs" role="tablist">
              {addedRooms.map((room) => (
                <button key={room} className={`nav-link ${activeTab === room ? 'active' : ''}`} onClick={() => setActiveTab(room)}>
                  {room}
                </button>
              ))}
            </div>
          </nav>

          <CRow>
            <CCol >
              {activeTab && roomQuotations[activeTab] && (
                <div>
                  <h5>Quotation for {activeTab}</h5>
                  <CForm className="m-2">
                    <CRow>
                      <CCol><CFormInput type="text" value={newItem.name} placeholder="Item Name" onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} /></CCol>
                      <CCol><CFormInput type="text" value={newItem.material} placeholder="Material" onChange={(e) => setNewItem({ ...newItem, material: e.target.value })} /></CCol>
                      <CCol><CFormInput type="number" value={newItem.length} placeholder="Length" onChange={(e) => setNewItem({ ...newItem, length: parseFloat(e.target.value) })} /></CCol>
                      <CCol><CFormInput type="number" value={newItem.height} placeholder="Height" onChange={(e) => setNewItem({ ...newItem, height: parseFloat(e.target.value) })} /></CCol>
                      <CCol><CFormInput type="number" value={newItem.price} placeholder="Price" onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} /></CCol>
                      <CCol><CButton color="primary" onClick={handleAddQuotationItem}>Add Item</CButton></CCol>
                    </CRow>
                  </CForm>
                  
                  <CTable hover bordered>
                  {Array.isArray(roomQuotations[activeTab]) && roomQuotations[activeTab].map((item, index) => (
                    <CTableBody>
   <CTableRow key={index}>
     <CTableDataCell>{item.name}</CTableDataCell>
     <CTableDataCell>{item.material}</CTableDataCell>
     <CTableDataCell>{item.length}</CTableDataCell>
     <CTableDataCell>{item.height}</CTableDataCell>
     <CTableDataCell>{item.price}</CTableDataCell>
     <CTableDataCell>{((item.length * item.height)/90000 * item.price).toFixed(2)}</CTableDataCell>
     <CTableDataCell>
       <CButton className="m-2" color="warning" onClick={() => handleEditQuotationItem(index)}>Edit</CButton>
       <CButton color="danger" onClick={() => handleDeleteQuotationItem(index)}>Delete</CButton>
     </CTableDataCell>
   </CTableRow>
                  </CTableBody>
))}
                  </CTable>

                </div>
              )}
            </CCol>
          </CRow>

        </CModalBody>

        <CModalFooter style={{ position: "relative", bottom: "10px", left: "10px" }}>
          <CButton color="secondary" onClick={() => setShowModal(false)}>Close</CButton>
          <CButton color="primary" onClick={handleSaveQuotation}>Save</CButton>
          <CButton color="success" onClick={handleDownloadExcel}>Download Excel</CButton>
          <CButton color="info" onClick={handleDownload}>Download PDF</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Customers;
