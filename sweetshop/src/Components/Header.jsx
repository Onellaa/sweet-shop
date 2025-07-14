import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/header.css";
import CartIcon from "./CartIcon";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Detect route changes

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, [location]); // Re-run this check when the route changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    setIsLoggedIn(false); // Optional, just to reflect immediately
    navigate("/home");
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="../src/assets/image.png" alt="logo" />
      </div>

      <nav>
        <ul>
          <li>
            <a href="/home" className="link">Home</a>
            <a href="/about" className="link">About Us</a>
            <a href="/menu" className="link">Products</a>
            {/* <a href="/contact" className="link">Contact Us</a> */}
            <a href="/recipe" className="link">Recipies</a>

          </li>
        </ul>
      </nav>

      <div className="login-button">
        <CartIcon />
        {!isLoggedIn ? (
          <>
            <button className="btn-login" onClick={() => navigate("/signup")}>
              Signup
            </button>
            <button className="btn-login" onClick={() => navigate("/login")}>
              Login
            </button>
          </>
        ) : (
          <>
            <button className="btn-login" onClick={() => navigate("/profile")}>
              Profile
            </button>
            <button className="btn-login" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
