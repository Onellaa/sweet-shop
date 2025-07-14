import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link,useNavigate } from "react-router-dom";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import cube1 from "../assets/image copy 9.png";
import cube2 from "../assets/h2.png";
import cube3 from "../assets/image copy 10.png";
import cube4 from "../assets/image copy 11.png";
import cube5 from "../assets/im.png";
import cube7 from "../assets/image copy 3.png";
import cube8 from "../assets/image copy 4.png";
import cube9 from "../assets/bobba (1).png";
import cube10 from "../assets/image copy 6.png";
import cube11 from "../assets/image copy.png";
import cube12 from "../assets/cup (1).png";
import cube13 from "../assets/image copy 15.png";
import cube14 from "../assets/c1.png";
import cube15 from "../assets/pink (1).png";
import cube18 from "../assets/soothie (1).png";
import cube19 from "../assets/pudding (1).png";
import cube16 from "../assets/coffee (1).png";
import cube17 from "../assets/image copy 16.png";
import bubz from "../assets/image copy 7.png";
import donut from "../assets/image copy 8.png";
import cube20 from "../assets/cake (1).png";
import cube21 from "../assets/b1 (1).png";
import cube22 from "../assets/cheese (1).png";
import cube23 from "../assets/f1 (1).png";
import video from "../assets/r1.mp4";
import cube24 from "../assets/image copy 25.png";
gsap.registerPlugin(ScrollTrigger);

const slides = [
  { id: 1, image: cube16, name: "ChocoLuxe", price: "$5" },
  { id: 2, image: cube19, name: "Rosé Cream Cake", price: "$15" },
  { id: 3, image: cube18, name: "Berry Pop Shake", price: "$8" },
  { id: 4, image: cube9, name: "Bubble Tea", price: "$10" },
  { id: 5, image: cube21, name: "Grape Cloud", price: "$12" },
  { id: 6, image: cube20, name: "Blush Berry Cake", price: "$15" },
  { id: 7, image: cube12, name: "TriWhirl Delight", price: "$12" },
  { id: 8, image: cube14, name: "Moocha Caramel", price: "$7" },
  { id: 9, image: cube22, name: "Cream & Crumble", price: "$12" },
]; // Replace with your images and data

const Home = () => {
  const navigate = useNavigate();
  const [coffee, setCoffee] = useState({
    title: "Donuts",
    description:
      "Delicious coffee should be simply coffee with nothing added, unless you add it yourself.",
    color: "#E0C3A0",
    cupImage: cube1,
    step: "01 / 05",
  });

  // Animation for coffee cup flip
  const coffeeCupSpring = useSpring({
    transform: "rotateY(0deg)",
    from: { transform: "rotateY(180deg)" },
    reset: true,
    config: { tension: 150, friction: 20 },
  });

  // Function to handle changing coffee type
  const changeCoffee = (newCoffee) => {
    setCoffee(newCoffee);
  };

  return (
    <div>
      <div className="header-section">
        {/* <Header /> */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title1">
              Welcome to <span className="hero-title ">Sweet Bliss</span>
            </h1>
            <p className="hero-description">
              Discover a world of sweetness and treat yourself to the finest
              candies and confections!
            </p>
            <div className="comingsoon animate__animated animate__bounceIn">
              <img src={cube15} alt="" className="svg" />
            </div>
            <button className="hero-button" onClick={() => navigate("/menu")}>Shop Now</button>
            <div className="open">
              <img src={cube24} className="open1" />
            </div>
            <div className="heropic1">
              <img src={cube16} alt="" className="heropic" />
            </div>
          </div>
        </section>
      </div>
      <div className="sprinkles1">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="sprinkles1"
        ></video>
      </div>

      {/* Product Grid with Scroll-triggered Animation */}

      {/* <div className="grid-container">
        
          {[
            cube7,
            cube8,
            cube9,
            cube10,
            cube11,
            cube12,
            cube13,
            cube14,
          ].map((image, index) => (
            <div key={index} className="item">
              <img src={image} alt={`Product ${index}`} />
              <button>Order</button>
            </div>
          ))}
        </div> */}
      {/* </div> */}

      <div className="grid-layy">
        <h1>Find Recipies</h1>

        <div class="recipies">
          <div class="rec1">
            <Link to="/recipe/cupcake">
              <img src={cube7} alt="Recipe 1" />

              <div class="overlay">
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="fa-icon"
                />
              </div>
            </Link>
          </div>
          <div class="rec1">
          <Link to="/recipe/cookie">
            <img src={cube8} alt="Recipe 2" />
            <div class="overlay">
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="fa-icon"
              />
            </div>
            </Link>
          </div>
          <div class="rec1">
           <Link to="/recipe/tiramisu">
            <img src={cube11} alt="Recipe 3" />
            <div class="overlay">
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="fa-icon"
              />
            </div>
            </Link>
          </div>
          <div class="rec1">
           <Link to="/recipe/macaron">
            <img src={cube10} alt="Recipe 4" />
            <div class="overlay">
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="fa-icon"
              />
            </div>
            </Link>
          </div>
        </div>
        <h1 className="grid-layy">New Releases ...</h1>
      </div>

      <div className="hero grid-layy">
        <div className="split-screen">
          {/* Left Section: Coffee Cup Image with Flip Animation */}
          <animated.div
            className="left-section"
            style={{ ...coffeeCupSpring, backgroundColor: coffee.color }}
          >
            <img
              src={coffee.cupImage}
              alt="Coffee Cup"
              className="coffee-cup"
              style={coffeeCupSpring}
            />
          </animated.div>

          {/* Right Section: Coffee Information with Sliding Animation */}
          <div className="right-section">
            <div className="content">
              <p className="step">{coffee.step}</p>
              <h1>{coffee.title}</h1>
              <p className="description">{coffee.description}</p>
              <a href="#" className="order-button" onClick={() => navigate("/menu")}>
                Order Now
              </a>
            </div>

            {/* Navigation Buttons */}
            <div className="circle-nav">
              <div
                className="circle"
                style={{ backgroundColor: "#8D493A" }}
                onClick={() =>
                  changeCoffee({
                    title: "Choco Luxe",
                    description:
                      "Rich chocolate dough topped with a silky cocoa glaze pure decadence",
                    color: "#E2BFB3",
                    cupImage: cube2,
                    step: "01 / 05",
                  })
                }
              ></div>
              <div
                className="circle"
                style={{ backgroundColor: "#BBE9FF" }}
                onClick={() =>
                  changeCoffee({
                    title: "Glazed Glory",
                    description:
                      "The ultimate golden classic soft,fluffy and dipped in a perfect sugar glaze",
                    color: "#E3F4F4",
                    cupImage: cube3,
                    step: "02 / 05",
                  })
                }
              ></div>
              <div
                className="circle"
                style={{ backgroundColor: "#F2BED1" }}
                onClick={() =>
                  changeCoffee({
                    title: "Sprinkle Joy",
                    description:
                      "Cheerful sprinkles on a classic vanilla glaze happiness in every bite.",
                    color: "#F8E8EE",
                    cupImage: cube4,
                    step: "03 / 05",
                  })
                }
              ></div>
              <div
                className="circle"
                style={{ backgroundColor: "#F4B183" }}
                onClick={() =>
                  changeCoffee({
                    title: "Citrus Splash",
                    description:
                      "Zesty orange and lemon glaze with a tangy twist – sunshine in a donut!",
                    color: "#FFDEB4",
                    cupImage: cube5,
                    step: "04 / 05",
                  })
                }
              ></div>
            </div>
          </div>
        </div>
        <img src={bubz} alt="Hero" className="himg" />
      </div>

      <div className="grid-layy">
        <h1> Products</h1>

        <div className="slider-container">
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 300,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="swiper-container"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="swiper-slide ">
                <div className="card">
                  <img src={slide.image} alt={slide.name} />
                  <h3>{slide.name}</h3>
                  <p>{slide.price}</p>
                  <button className="add-cartt" onClick={() => navigate("/menu")}>Add to Cart</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* <img src={donut} alt="Donut" className="img1" /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
