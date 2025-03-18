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
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const roomsList = [
  "Living", "Dining", "MBR", "KBR", "CBR", "PBR", "GBR", "Bedroom1",
  "Bedroom2", "Bedroom3", "Bedroom4", "Kitchen", "Utility", "Washroom",
  "Study Room", "Foyer", "Balcony"
];

const Customers = () => {
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState({ CXName: "", CXLatestQuotation: "", CXStage: "" });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [roomQuotations, setRoomQuotations] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [addedRooms, setAddedRooms] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", material: "", length: 0, height: 0, price: 0 });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    setData(getCustomerData());
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

    // Create header row
    wsData.push(["Room", "Item Name","Material", "Length", "Height", "Price", "Total"]);

    addedRooms.forEach((room) => {
      const roomItems = roomQuotations[room];
      if (roomItems && roomItems.length > 0) {
        roomItems.forEach(item => {
          wsData.push([
            room,
            item.name,
            item.material,
            item.length,
            item.height,
            item.price,
            (((item.length * item.height)/90000) * item.price).toFixed(2)
          ]);
        });
      }
    });

    // Generate worksheet and workbook
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quotation");

    // Download the Excel file
    XLSX.writeFile(wb, "Customer_Quotation.xlsx");
  };
 
  
  
  const handleDownload = () => {
    // Generate PDF Blob and download
    pdf(<QuotationPDF />)
      .toBlob()
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Customer_Quotation.pdf';
        link.click();
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.CXName || !customer.Property || !customer.Budget) {
      alert("Please fill in all required fields.");
      return;
    }
    addCustomer(customer);
    setData(getCustomerData());
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
      setRoomQuotations((prev) => ({
        ...prev,
        [quotation.room]: quotation.items
      }));
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

  const handleSaveQuotation = () => {
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
        0
      )
    };

    updateCustomerQuotation(updatedCustomer.index, updatedCustomer.quotations);
    setData((prevData) => prevData.map((customer, index) =>
      index === updatedCustomer.index ? updatedCustomer : customer
    ));

    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <CRow>
        <CCol>
          <h2>Customer Management</h2>
          <CForm onSubmit={handleSubmit} className="m-2">
            <CRow>
              <CCol>
                <CFormInput type="text" name="CXName" placeholder="Customer Name" value={customer.CXName} onChange={handleChange} required />
              </CCol>
              <CCol>
                <CFormInput type="text" name="Property" placeholder="Property Name" value={customer.Property} onChange={handleChange} required />
              </CCol>
              <CCol>
                <CFormInput type="text" name="Budget" placeholder="Budget" value={customer.Budget} onChange={handleChange} required />
              </CCol>
              <CCol>
                <CButton color="success" type="submit">Add Customer</CButton>
              </CCol>
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
        <CModalBody>
          <CRow>
            <CCol xl={3}>
              <CFormSelect className="m-1" onChange={(e) => handleAddRoom(e.target.value)}>
                <option value="">Select Room to Add</option>
                {roomsList.map((room) => (
                  <option className="m-2" key={room} value={room}>
                    {room}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
            <figure class="text-center">
  <blockquote class="blockquote">
    <p>DEMO ERP</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    <cite title="Source Title"> Please Add Rooms for Quotation</cite>
  </figcaption>
</figure>
            </CCol>
          </CRow>
          <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
  {addedRooms.map((room) => (
    <button class="nav-link active m-1" id="nav-home-tab" data-coreui-toggle="tab" data-coreui-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick ={()=> setActiveTab(room)} >{room}</button>
  ))}
  </div>
</nav>
        

<CTabContent className="">
            {addedRooms.map((room) => (
              <CTabPane key={room} visible={activeTab === room}>
                <div>
                  <CRow className="m-2">
                    <CCol>
                      <CFormInput
                        type="text"
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      />
                    </CCol>
                    <CCol>
                      <CFormInput
                        type="text"
                        placeholder="Material"
                        value={newItem.material}
                        onChange={(e) => setNewItem({ ...newItem, material: e.target.value })}
                      />
                    </CCol>
                    <CCol>
                      <CFormInput
                        type="number"
                        placeholder="Length"
                        value={newItem.length}
                        onChange={(e) => setNewItem({ ...newItem, length: parseFloat(e.target.value) })}
                      />
                    </CCol>
                    <CCol>
                      <CFormInput
                        type="number"
                        placeholder="Height"
                        value={newItem.height}
                        onChange={(e) => setNewItem({ ...newItem, height: parseFloat(e.target.value) })}
                      />
                    </CCol>
                    <CCol>
                      <CFormInput
                        type="number"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                      />
                    </CCol>
                    <CCol>
                      <CButton color="primary" onClick={handleAddQuotationItem}>
                        {editingItem !== null ? "Edit Item" : "Add Item"}
                      </CButton>
                    </CCol>
                  </CRow>

                  <CTable hover bordered responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Item Name</CTableHeaderCell>
                        <CTableHeaderCell>Material</CTableHeaderCell>
                        <CTableHeaderCell>Length</CTableHeaderCell>
                        <CTableHeaderCell>Height</CTableHeaderCell>
                        <CTableHeaderCell>Price</CTableHeaderCell>
                        <CTableHeaderCell>Total</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {roomQuotations[room]?.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{item.name}</CTableDataCell>
                          <CTableDataCell>{item.material}</CTableDataCell>
                          <CTableDataCell>{item.length}</CTableDataCell>
                          <CTableDataCell>{item.height}</CTableDataCell>
                          <CTableDataCell>{item.price}</CTableDataCell>
                          <CTableDataCell>{((item.length * item.height )/90000 * item.price).toFixed(2)}</CTableDataCell>
                          <CTableDataCell>
                            <CButton className="m-1" color="warning" onClick={() => handleEditQuotationItem(index)}>Edit</CButton>
                            <CButton color="danger" onClick={() => handleDeleteQuotationItem(index)}>Delete</CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>
              </CTabPane>
            ))}
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>Close</CButton>
          <CButton color="primary" onClick={handleSaveQuotation}>Save Quotation</CButton>
          <CButton color="success" onClick={handleDownload}>Download Quotation (PDF)</CButton>
                    <CButton color="success" onClick={handleDownloadExcel}>Download Quotation (Excel)</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Customers;
