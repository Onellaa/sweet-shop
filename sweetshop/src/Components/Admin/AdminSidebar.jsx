import React from "react";
import { NavLink } from "react-router-dom";
import { RiDashboard3Fill } from "react-icons/ri";
import ProductsManagement from '../Admin/Product Management';

import { 
  FiPieChart, FiShoppingBag, FiTruck, FiUser, 
  FiPackage, FiBarChart2, FiSettings,
} from 'react-icons/fi';
import { FaIceCream } from 'react-icons/fa';
import "../../css/admin.css";

const Admin = () => {
  const menuItems = [
    { path: "/dashboard", icon: <RiDashboard3Fill />, name: "Dashboard" },
    { path: "/products", icon: <FaIceCream />, name: "Products" },
    { path: "/orders", icon: <FiShoppingBag />, name: "Orders" },
    { path: "/customers", icon: <FiUser/>, name: "Customers" },
    { path: "/categories", icon: <FiPackage />, name: "categories" },
    { path: "/reports", icon:  <FiBarChart2 />, name: "Reports" },
    { path: "/settings", icon:  <FiSettings />, name: "Settings" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>SweetShop Admin</h2>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) => 
              isActive ? 'menu-item active' : 'menu-item'
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="user-profile">
          <span className="user-avatar">👨‍🍳</span>
          <span className="user-name">Admin</span>
        </div>
      </div>
    </div>
  );
};


export default Admin;
