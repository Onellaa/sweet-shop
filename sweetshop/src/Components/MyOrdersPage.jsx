import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/MyOrdersPage.css";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/payment/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders", err));
  }, []);

  const handleViewItems = async (oid) => {
    if (expandedOrderId === oid) {
      setExpandedOrderId(null);
      setOrderItems([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/api/payment/orders/${oid}/items`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setExpandedOrderId(oid);
      setOrderItems(res.data);
    } catch (err) {
      console.error("Failed to fetch order items", err);
    }
  };

  return (
    <div className="orders-container">
      <h2>🧾 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total (Rs.)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.oid}>
                <tr>
                  <td>{order.oid}</td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td>
                  <td>{order.status}</td>
                  <td>{order.total.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleViewItems(order.oid)}>
                      {expandedOrderId === order.oid ? "Hide" : "View Items"}
                    </button>
                  </td>
                </tr>
                {expandedOrderId === order.oid && (
                  <tr>
                    <td colSpan="5">
                      <ul>
                        {orderItems.map((item, index) => (
                          <li key={index} className="order-item">
                            <img
                              src={`http://localhost:3000/uploads/${item.image_url}`}
                              alt={item.pname}
                              className="item-image"
                            />

                            <div className="item-details">
                              <p>
                                <strong>{item.pname}</strong>
                              </p>
                              <p>
                                {item.qty} pcs × Rs.{item.price.toFixed(2)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrdersPage;
