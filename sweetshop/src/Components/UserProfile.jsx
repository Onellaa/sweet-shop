import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/UserProfile.css";
import bubz from "../assets/profile.png";
import { FaMapMarkerAlt, FaGlobe, FaCalendarAlt, FaCamera, FaPhone, FaVoicemail } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Profile fetch error:", err));
  }, []);

  return (
    <div className="profile-twitter-box">
      <img src={bubz} alt="Profile" className="twitter-profile-pic" />
      <h2 className="twitter-name">
        {user?.cname} <span className="twitter-verified">✔</span>
      </h2>
      <p className="twitter-handle">{user?.email}</p>
      <p className="twitter-bio">Awesome customer at SweetsHub🍰</p>

      <div className="twitter-info">
        <p><FaMapMarkerAlt className="icon" /> {user?.address || "Unknown City"}</p>
        <p><FaVoicemail className="icon" /> <a href="https://gmail.com" target="_blank" rel="noreferrer">{user?.email}</a> </p>
        <p><FaCalendarAlt className="icon" /> Joined April 2024</p>
        <p><FaPhone className="icon" /> {user?.phone}</p>
      </div>
    </div>
  );
};

export default UserProfile;
