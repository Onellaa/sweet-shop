import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Home from "./Components/Home.jsx";
import "./App.css";
import Admin from "./Components/Admin/Admin.jsx";
import About from "./Components/About.jsx";
import Footer from "./Components/Footer.jsx";
import ProductManagement from "./Components/Admin/Product Management.jsx";
import CategoriesManagement from "./Components/Admin/CategoriesManagement.jsx";
import CustomerProducts from "./Components/CustomerProducts.jsx";
import AdminCustomers from "./Components/Admin/Customers";
import Signup from "./Components/Signup.jsx";
import Cart from "./Components/Cart.jsx";
import Login from "./Components/Login.jsx";
import PaymentPage from "./Components/PaymentPage.jsx";
import ProfileDashboard from "./Components/ProfileDashboard.jsx";
import RecipePage from "./Components/RecipePage.jsx";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();

  // Paths where Header should be hidden
  const hideHeaderPaths = ["/dashboard"];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/categories" element={<CategoriesManagement />} />
        <Route path="/menu" element={<CustomerProducts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/orders" element={<ProfileDashboard />} />
        <Route path="/profile" element={<ProfileDashboard />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/recipe/:dish" element={<RecipePage />} />
        <Route path="/customers" element={<AdminCustomers />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default AppWrapper;
