import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import UserProfile from "./UserProfile";
import MyOrdersPage from "./MyOrdersPage";
import "../css/ProfileDashboard.css";
import marshmallow from "../assets/bobbly.png"; //  ➜  add this image
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProfileDashboard() {
   const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const titleRef = useRef();
  const contentRef = useRef();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Profile fetch error:", err));
  }, []);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      contentRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.3, ease: "back.out(1.7)" }
    );
  }, [user]);

  if (!user) return <div className="hero-wrapper">Loading...</div>;

  gsap.from(".profile-card, .orders-card", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
  ease: "power4.out"
});


  return (
    <div className="movie-layout">
      {/* ─── Left hero section ───────────────────── */}
      <section className="hero-panel">
        <nav className="side-nav">
          <i className="icon-home" />
          <i className="icon-user" />
          <i className="icon-settings" />
        </nav>

        <div className="hero-content">
          <h1 className="hero-titlee">Hey {user?.cname ||"Sweetie"}👋</h1>
          {/*  */}
          <p className="hero-tagline">
            Welcome back! Ready to check your delicious order history?
          </p>

          <div className="hero-badge">
            <span className="badge-text">🍭 Loyal Customer</span>
             <UserProfile />
          </div>
        </div>

        <img src={marshmallow} alt="Marshmallow Monster" className="hero-img" />
      </section>

      {/* ─── Right column (profile + orders) ─────── */}
      <section className="info-panel">
        {/* <UserProfile /> */}
        <div className="spacer" /> {/* thin gap */}
        <MyOrdersPage />
      </section>
    </div>
  );
}
