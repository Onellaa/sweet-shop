// src/components/SignupVisual360.jsx
import { useEffect, useState } from "react";
import "../css/signupVisual.css"; // new stylesheet (next section)
import cube1 from "../assets/d3.png";
import cube2 from "../assets/sw.png";
import cube3 from "../assets/image copy 10.png";
import cube4 from "../assets/image copy 11.png";
import cube5 from "../assets/im.png";
import cube7 from "../assets/image copy 29.png";
import cube8 from "../assets/image copy 29.png";
import cube9 from "../assets/cake (1).png";
import cube10 from "../assets/cheese (1).png";
import cube11 from "../assets/si3.png";
import cube12 from "../assets/sw1.png";
import cube13 from "../assets/bobba (1).png";
import cube14 from "../assets/image copy 33.png";
import cube15 from "../assets/pink (1).png";
import cube18 from "../assets/sw2.png";

const slides = [
  {
    bg: "#fccbf0",
    title: "El Chrome de Diana",
    center: cube2,
    items: [
      { img: cube1, x: "-20px", y: "-90px", delay: "0.2s" },
      { img: cube3, x: "180px", y: "-30px", delay: "0.4s" },
      { img: cube4, x: "-30px", y: "140px", delay: "0.6s" },
      { img: cube5, x: "250px", y: "200px", delay: "0.8s" },
    ],
  },
  {
    bg: "#ffd6ea",
    title: "Il Chrome di Vittorio",
    center: cube12,
    items: [
      { img: cube7, x: "-40px", y: "50px", delay: "0.2s" },
      { img: cube8, x: "205px", y: "-35px", delay: "0.4s" },
      { img: cube9, x: "-45px", y: "295px", delay: "0.6s" },
      { img: cube10, x: "255px", y: "195px", delay: "0.8s" },
    ],
  },
  {
    bg: "#ded4fa",
    title: "June’s Chrome",
    center: cube11,
    items: [
      { img: cube13, x: "-30px", y: "-30px", delay: "0.2s" },
      { img: cube18, x: "250px", y: "105px", delay: "0.4s" },
      { img: cube15, x: "-50px", y: "230px", delay: "0.6s" },
      { img: cube14, x: "250px", y: "300px", delay: "0.8s" },
    ],
  },
];

export default function SignupVisual360() {
  const [idx, setIdx] = useState(0);

  // auto-advance every 4 s
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="sv360-scene">

      {/* 3-D rotating drum */}
      <div
        className="sv360-drum"
        style={{ transform: `rotateY(-${idx * 120}deg)` }} // 120° apart
      >
        {slides.map((slide, i) => (
          <div
            className="sv360-card"
            key={i}
            style={{
              background: slide.bg,
              transform: `rotateY(${i * 120}deg) translateZ(420px)`,
            }}
          >
            <img src={slide.center} alt="" className="sv360-center" />
            {slide.items.map((f, k) => (
              <img
                key={k}
                src={f.img}
                alt=""
                className="sv360-float"
                style={{
                  left: f.x,
                  top: f.y,
                  animationDelay: f.delay,
                }}
              />
            ))}
            <h3>{slide.title}</h3>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="sv360-dots">
        {slides.map((_, d) => (
          <span key={d} className={d === idx ? "active" : ""} />
        ))}
      </div>
    </div>
  );
}
