import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";
import cube15 from "../assets/fina2.png";
import Swal from "sweetalert2";
import SignupVisual360 from "../Components/SignupVisual360";

const Signup = () => {
  const [form1, setForm] = useState({
    cname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search) navigate("/signup", { replace: true });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form1, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/customers/signup",
        form1
      );
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: res.data.message,
        background: "#fce4ec", // light pink
        color: "#880e4f", // dark pink text
        confirmButtonColor: "#f48fb1", // soft pink button
        width: "360px", // smaller box
      }).then(() => navigate("/login"));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.response?.data?.message || "Server error",
        background: "#fce4ec",
        color: "#880e4f",
        confirmButtonColor: "#f48fb1",
        width: "360px",
      });
    }
  };

  return (
    <div className="signup-layout">
      <div>
        <img src={cube15} className="decoidk" />
      </div>
      {/* Left: Form */}
      <form className="auth-form signup-card" onSubmit={handleSubmit}>
        <h1 className="brand">
          <span role="img" aria-label="bulb">
            💡
          </span>{" "}
          dreamer<span className="dot">.</span> <b>Sign up</b>
        </h1>

        <input
          name="cname"
          placeholder="Name"
          value={form1.cname}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form1.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form1.password}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form1.phone}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={form1.address}
          onChange={handleChange}
        />
        <button type="submit" className="primary-btn">
          Create account
        </button>

        <p className="switch-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>

      {/* Right: Auto-changing Visual */}
      <div className="chrome-visual">
        <SignupVisual360 />
      </div>
    </div>
  );
};

export default Signup;
