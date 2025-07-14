// StudentHeroBanner.jsx
import React from "react";
import "../css/StudentHeroBanner.css"; // Adjust the path as necessary
import bannerImg from "../assets/ks.png"; // Replace with your actual path
import { useNavigate } from "react-router-dom";

export default function StudentHeroBanner() {
  const navigate = useNavigate();
  return (
    <section className="tribe-banner">

      <div className="tribe-main">
      
        <div className="tribe-left">
          <h1 className="tribe-heading">
            BakerBot,<br />Build your bliss.
          </h1>
          {/* <p className="tribe-subtext">
            Connect with like-minded students for fun, friendships, and future opportunities.
            
          </p> */}
          <div className="tribe-actions">
            <button className="tribe-btn-primary" onClick={()=> navigate("/about")}>About Us</button>
            <button className="tribe-btn-secondary" onClick={()=> navigate("/menu")}>Explore Shop</button>
          </div>
        </div>

        {/* <div className="tribe-right"> */}
          <img src={bannerImg} alt="Students Together" className="tribe-img" />
        {/* </div> */}
      </div>
    </section>
  );
}
