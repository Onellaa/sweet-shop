import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Cart.css";
import Devlivery from "../assets/deliv.png";
import { useNavigate } from "react-router-dom";
// import { use } from "react";
import Swal from "sweetalert2";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const changeQty = async (pid, action) => {
    try {
      await axios.put(
        `http://localhost:3000/api/cart/${action}/${pid}`, // action = "inc" | "dec"
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Qty change failed:", err);
    }
  };

  return (
    <div className="cart-hero">
      <div className="cart-sidebar">
        <h1 className="vertical-title">CART</h1>
      </div>
      <div className="lottie-wrapper">
        <img src={Devlivery} alt="Delivery" className="delivery-image" />
      </div>
      <div className="cart-main">
        <h2 className="cart-header">Your Sweet Cart</h2>

        {cartItems.length === 0 ? (
          <p className="empty-msg">Your cart is empty 😔</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-card" key={item.cart_id}>
              <img
                src={`http://localhost:3000/uploads/${item.image_url}`}
                alt={item.pname}
                className="cart-product-img"
              />
              <div className="cart-info">
                <h3> {item.pname}</h3>
                <p className="cart-total">Rs. {item.price * item.quantity}</p>
                <p>Qty: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.product_id)}>
                  Remove ❌
                </button>
                <div className="qty-controls">
                  <button onClick={() => changeQty(item.product_id, "dec")}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQty(item.product_id, "inc")}>
                    ＋
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="cart-summary">
          <h3>Total: Rs. {totalPrice.toFixed(2)}</h3>
          <button
            className="checkout-btn"
            onClick={() => {
              if (cartItems.length === 0) {
                Swal.fire({
                  icon: "warning",
                  title: "Oops!",
                  text: "Your cart is empty. Add some sweets first 🍭",
                  confirmButtonText: "Back to Shop",
                  confirmButtonColor: "#f48fb1", // Pink confirm button
                  background: "#fce4ec", // Light pastel pink background
                  color: "#880e4f",
                });
              } else {
                navigate("/payment");
              }
            }}
          >
            🚀 Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
