import React, { useEffect, useState } from "react";
import "../css/slideshow.css"; // Create this CSS file for the styles
import slide1 from "../assets/image copy 3.png"; // Replace with your image paths
import slide2 from "../assets/image copy 4.png";
import slide3 from "../assets/image copy 5.png";


const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [slide1, slide2, slide3];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          className={`mySlides fade ${index === slideIndex ? "active" : ""}`}
          key={index}
          style={{ display: index === slideIndex ? "block" : "none" }}
        >
          <div className="numbertext">{`${index + 1} / ${slides.length}`}</div>
          <img src={slide} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
          <div className="text">{`Caption ${index + 1}`}</div>
        </div>
      ))}

      <div style={{ textAlign: "center" }}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === slideIndex ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
