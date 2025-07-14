import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";
import SignupVisual360 from "../Components/SignupVisual360";
import cube15 from "../assets/fina2.png";
import Swal from "sweetalert2";

const Login = () => {
  const [role, setRole] = useState("customer");

  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login form...");

    try {
      let loginUrl =
        role === "admin"
          ? "http://localhost:3000/api/customers/admin/login"
          : "http://localhost:3000/api/customers/login";

      const res = await axios.post(loginUrl, form);

      // Save token & user
      localStorage.setItem("token", res.data.token);
      // localStorage.setItem("user", JSON.stringify(res.data.user));

      if (role === "admin") {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.customer));
      }

      // Redirect

      // ✅ Styled success alert
      await Swal.fire({
        icon: "success",
        title: "Login successful! 🎉",
        text: "Welcome back!",
        background: "#fce4ec",
        color: "#880e4f",
        confirmButtonColor: "#f48fb1",
        width: "360px",
      });
      navigate(role === "admin" ? "/dashboard" : "/home");
      // navigate("/home");
    } catch (err) {
      console.error("❌ Login error:", err);

      let message = "Something went wrong";

      if (err.response) {
        message = err.response.data.message || "Server error";
      } else if (err.request) {
        message = "No response from server";
      } else {
        message = err.message;
      }

      // ❌ Styled error alert
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
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
      <form className="auth-form signup-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button className="primary-btn" type="submit">
          Log In
        </button>
        <p className="switch-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
      <div className="chrome-visual">
        <SignupVisual360 />
      </div>
    </div>
  );
};

export default Login;
