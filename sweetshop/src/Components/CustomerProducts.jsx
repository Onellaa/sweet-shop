// CustomerProducts.jsx (updated layout like Starbucks UI)
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/navigation";
import "../css/products.css";
import coffee from "../assets/cof2.png";
import coffee1 from "../assets/image copy 34.png";
import coffee2 from "../assets/image copy 36.png";
import coffee3 from "../assets/image copy 38.png";

axios.defaults.baseURL = "http://localhost:3000";

const colourMap = {
  CAKES: { bg:"#f5aeae",circleImage: coffee2 },
  CHOCOLATES: { bg: "#f7e2cd", circleImage: coffee3 },
  DONUTS: { bg: "#defcde", circleImage: coffee1 },
  DEFAULT: { bg: "#f5d7ae", circleImage: coffee3 },
};

export default function CustomerProducts() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCat] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [theme, setTheme] = useState(colourMap.DEFAULT);
  const pageRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    axios
      .get("/api/categories/with-counts")
      .then((r) => setCategories(r.data ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const url = selectedCategory
      ? `/api/products/by-category/${selectedCategory}`
      : "/api/products";

    axios.get(url).then((r) => {
      const list = r.data ?? [];
      setProducts(list);
      setFeatured(list[0]);
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (!featured) return;
    const key = featured.category_name?.toUpperCase() || "DEFAULT";
    const next = colourMap[key] || colourMap.DEFAULT;
    setTheme(next);

    gsap.to(pageRef.current, { backgroundColor: next.bg, duration: 0.5 });

    if (next.circleImage) {
      circleRef.current.style.backgroundImage = `url(${next.circleImage})`;
      circleRef.current.style.backgroundSize = "cover";
      circleRef.current.style.backgroundPosition = "center";
      circleRef.current.style.backgroundRepeat = "no-repeat";
      gsap.to(circleRef.current, { opacity: 1, duration: 0.5 });
    } else {
      circleRef.current.style.backgroundImage = "";
      circleRef.current.style.backgroundColor = next.circle || "#eee9dd";
    }
    // gsap.to(circleRef.current,
    //    { backgroundColor: next.circle, duration: 0.5 });
  }, [featured]);

  const token = localStorage.getItem("token");
  const addToCart = (pid) =>
    axios
      .post(
        "/api/cart/add",
        { product_id: pid, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch(() => alert("Add-to-cart failed"));

  return (
    <div className="sbux-page" ref={pageRef}>
      <div className="hero-row8">
        <div className="left-panel8">
          <h1 className="main-title8">Mindful Treats for Calm</h1>
          <p className="sub-title8">
            Hand-crafted desserts to brighten your day.
            <br />
            Pick a flavour, savour the bliss!
          </p>
          <p className="price8">${featured?.price?.toFixed(2)}</p>
          <button
            className="order-btn8"
            onClick={() => addToCart(featured?.pid)}
          >
            Add to Cart
          </button>
        </div>

        <div className="hero-product8">
          <div className="circle-bg8" ref={circleRef}>
            <div className="dark-overlay"></div>
          </div>
          <>
            <img src={coffee} className="floating-bean bean1" />
            <img src={coffee} className="floating-bean bean2" />
          </>
          <img
            src={`http://localhost:3000/uploads/${featured?.image_url}`}
            alt={featured?.pname}
            className="hero-img8"
          />
        </div>

        <div className="right-info8">
          {categories.map((c) => (
            <div
              key={c.cid}
              className={`category-badge8 ${
                selectedCategory === c.cid ? "active" : ""
              }`}
              onClick={() => setSelectedCat(c.cid)}
            >
              <span className="cat-icon8">🍬</span>
              <div>
                <h4>{c.cname}</h4>
                <p>{c.product_count} items</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="product-carousel8">
        <Swiper
          modules={[Navigation]}
          navigation
          loop
          slidesPerView={3}
          spaceBetween={30}
        >
          {products.map((p) => (
            <SwiperSlide key={p.pid}>
              <div
                className={`swiper-item8 ${
                  featured?.pid === p.pid ? "active" : ""
                }`}
                onClick={() => setFeatured(p)}
              >
                <div className="thumb-circle8">
                  <img
                    src={`http://localhost:3000/uploads/${p.image_url}`}
                    alt={p.pname}
                  />
                </div>
                <p>{p.pname}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
