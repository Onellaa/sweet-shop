import React, { useState } from "react";
import "../css/About.css";
import m1 from "../assets/del.png";
import m2 from "../assets/real-Photoroom.png";
import m3 from "../assets/n-Photoroom.png";
import m4 from "../assets/min-Photoroom.png";
import m5 from "../assets/cool.png";
import m6 from "../assets/truck.gif";
import m7 from "../assets/image copy 8.png";
import m8 from "../assets/b1 (1).png";
import m9 from "../assets/cup1.png";
import m10 from "../assets/v1.mp4";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const [fortune, setFortune] = useState("");
  const [isOpen, setOpen] = useState(false);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const messages = [
    "You will find happiness in a sweet treat today!",
    "A delicious surprise is waiting for you!",
    "Good things come to those who eat sweets!",
    "Your future is as bright as a candy rainbow!",
    "Share a sweet moment with someone special!",
    "Life is short—eat the dessert first!",
    "A sweet adventure is just around the corner!",
    "You deserve a treat today!",
    "The best is yet to come—with sprinkles on top!",
    "Your kindness is sweeter than sugar!",
  ];

  const openCookie = () => {
    if (!isOpen) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setFortune(messages[randomIndex]);
      setOpen(true);
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
    }
  };

  const resetGame = () => {
    setFortune("");
    setOpen(false);
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          colors={["#ff6f61", "#ffcc00", "#00ccff", "#ff00ff"]}
        />
      )}
      <div className="about-page">
        {/* Hero Section */}
        <div className="hero-section1">
          <div className="wave-background"></div>
          <div className="hero-content1">
            <h1>Welcome to Our Sweet World</h1>
            <p>Indulge in the finest sweets crafted with love and tradition.</p>
            <button className="cta-button" onClick={()=> navigate("/menu")}>Explore Our Menu</button>
          </div>
          <div className="hero-image">
            <img src={m1} alt="Sweet Shop" className="floating" />
            <div className="floating-icons">
              <img src={m9} alt="Cake" className="icon-1" />
              <img src={m9} alt="Cupcake" className="icon-2" />
              <img src={m9} alt="Donut" className="icon-3" />
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="about-section">
          <div className="about-content">
            <h2>About Us</h2>
            <div className="about-content-wrapper">
              {/* Lottie Container on the Left Top */}
              <div className="lottie-container">
                <DotLottieReact
                  src="https://lottie.host/35995b8e-f8f5-4de3-8564-58a9e23e6935/gJSBB89MVh.lottie"
                  loop
                  autoplay
                />
              </div>

              {/* Text in the Middle */}
              <div className="about-text">
                <p>
                  Our Sweet Shop, a family owned business with over 50 years of
                  experience, offers the finest sweets made from the best
                  ingredients. We take pride in delivering fresh, delicious
                  treats for everyone to enjoy. Your feedback helps us improve,
                  and we look forward to serving you!
                </p>
              </div>

              {/* Video on the Right */}
              <div className="masked-container">
                <video
                  src={m10}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="masked-image"
                ></video>
              </div>
            </div>
          </div>
        </div>
      
        {/* Services Section */}
        <div className="services-section">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <img src={m2} alt="Custom Cakes" className="service-image" />
              <h3>Custom Cakes</h3>
              <p>
                We create custom cakes for all occasions, tailored to your
                preferences.
              </p>
            </div>


<div className="fortune-section">
          <h2>Try Your Fortune!</h2>
          <div className="fortune-container">
            <div className="cookie-wrapper" onClick={openCookie}>
              {isOpen ? (
                <div className="fortune-message">{fortune}</div>
              ) : (
                <DotLottieReact
                  src="https://lottie.host/cdf9953a-f28d-418a-99bb-d32624787b95/Pk0671XAh8.lottie"
                  loop
                  autoplay
                  className="cookie"
                />
              )}
            </div>
            {isOpen && (
              <button className="reset-button" onClick={resetGame}>
                Try Again
              </button>
            )}
          </div>
        </div>

            <div className="service-card">
              <img src={m3} alt="Sweet Deliveries" className="service-image" />
              <h3>Sweet Deliveries</h3>
              <p>Get your favorite sweets delivered fresh to your doorstep.</p>
            </div>
            {/* <div className="service-card">
              <img src={m4} alt="Event Catering" className="service-image" />
              <h3>Event Catering</h3>
              <p>
                We provide catering services for weddings, parties, and more.
              </p>
            </div> */}
          </div>
        </div>
  {/* Fortune Cookie Game */}
  {/* <div className="fortune-section">
          <h2>Try Your Fortune!</h2>
          <div className="fortune-container">
            <div className="cookie-wrapper" onClick={openCookie}>
              {isOpen ? (
                <div className="fortune-message">{fortune}</div>
              ) : (
                <DotLottieReact
                  src="https://lottie.host/cdf9953a-f28d-418a-99bb-d32624787b95/Pk0671XAh8.lottie"
                  loop
                  autoplay
                  className="cookie"
                />
              )}
            </div>
            {isOpen && (
              <button className="reset-button" onClick={resetGame}>
                Try Again
              </button>
            )}
          </div>
        </div> */}

       

        {/* Footer Section */}
      
      </div>
    </>
  );
};

export default About;
