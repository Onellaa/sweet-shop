import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/cartIcon.css"; // Assuming you have a CSS file for styling

const CartIcon = () => {  
const[itemCount, setItemCount] = useState(0);
const navigate = useNavigate();

useEffect(()=>{
  // Load count when page loads
  const fetchCartCount = async () => {
 const token = localStorage.getItem("token");
    if (!token) return; // No token means no cart
    try{
      const res = await fetch("http://localhost:3000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setItemCount(data.length); // number of items in cart
    }catch(err){
         console.error("Error loading cart count:", err);
    }
  };
  fetchCartCount();

},[])

return(
    <div className="cart-icon" onClick={() => navigate("/cart")}>
      🛒
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </div>
)

}
export default CartIcon;