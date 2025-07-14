import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../Admin/AdminSidebar";
import "../../css/dashboard.css"; // your styles
// src/pages/AdminCustomers.jsx

const Customers = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/customers")
      .then((res) => setRows(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
        <div className="admin-layout">
      <AdminSidebar />
      <div className="dashboard-main-content">
        <div className="dashboard-container">
          <h2 className="section-title">All Customers</h2>
          <table className="glass-table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Address</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.cid}>
                  <td>{c.cid}</td>
                  <td>{c.cname}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
