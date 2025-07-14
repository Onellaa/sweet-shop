import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../css/dashboard.css";
ChartJS.register(ArcElement, Tooltip, Legend);
import pay from "../../assets/ad.png";




export default function AdminDashboard() {

  const [counts, setCounts] = useState({ customers: 0, orders: 0, products: 0 });
  const [categoryData, setCategoryData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newProduct, setNewProduct] = useState({
    pid: "",
    pname: "",
    category_id: "",
    price: "",
    description: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  const handleDeleteCategory = async (cid) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:3000/api/categories/${cid}`);
        setCategories(categories.filter((cat) => cat.cid !== cid));
        alert("Category deleted successfully!");
      } catch (err) {
        alert("Error: " + (err.response?.data?.error || "Failed to delete category"));
      }
    }
  };
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingCatId, setEditingCatId] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      const [c, o, p] = await Promise.all([
        axios.get("http://localhost:3000/api/admin/count/customers"),
        axios.get("http://localhost:3000/api/admin/count/orders"),
        axios.get("http://localhost:3000/api/admin/count/products")
      ]);
      setCounts({ customers: c.data.count, orders: o.data.count, products: p.data.count });
    };

    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:3000/api/admin/stats/categories");
      setCategoryData(res.data);
    };

    const fetchCustomers = async () => {
      const res = await axios.get("http://localhost:3000/api/admin/customers");
      setCustomers(res.data);
    };

    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
    };

    const fetchAllCategories = async () => {
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(res.data);
    };

    fetchCounts();
    fetchCategories();
    fetchCustomers();
    fetchProducts();
    fetchAllCategories();
  }, []);

  const pieData = {
    labels: categoryData.map(c => c.category),
    datasets: [{
      data: categoryData.map(c => c.productCount),
      backgroundColor: ["#ffb6c1", "#ff8fab", "#ff66a3", "#ffd6e7"],
      borderColor: "#fff",
      borderWidth: 1
    }]
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pname", newProduct.pname);
    formData.append("category_id", newProduct.category_id);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    if (newProduct.image) formData.append("image", newProduct.image);
    try {
      const url = editingId ? `http://localhost:3000/api/products/${editingId}` : "http://localhost:3000/api/products";
      const method = editingId ? "put" : "post";
      await axios[method](url, formData, { headers: { "Content-Type": "multipart/form-data" } });
      setEditingId(null);
      setNewProduct({ pid: "", pname: "", category_id: "", price: "", description: "", image: null });
      const updated = await axios.get("http://localhost:3000/api/products");
      setProducts(updated.data);
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDeleteProduct = async (pid) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${pid}`);
        setProducts(products.filter(p => p.pid !== pid));
      } catch (err) {
        alert("Error deleting product");
      }
    }
  };

  const editProduct = (product) => {
  setEditingId(product.pid);
  setNewProduct({
    pid: product.pid,
    pname: product.pname,
    category_id: product.category_id,
    price: product.price,
    description: product.description,
    image: null // don't preload image file input
  });
};


  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCatId ? `http://localhost:3000/api/categories/${editingCatId}` : "http://localhost:3000/api/categories";
      const method = editingCatId ? "put" : "post";
      const res = await axios[method](url, { cname: newCategory, description: newDescription });
      const refreshed = await axios.get("http://localhost:3000/api/categories");
      setCategories(refreshed.data);
      setNewCategory("");
      setNewDescription("");
      setEditingCatId(null);
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || err.message));
    }
   
  };

  return (
    <div className="modern-dashboard-grid">
    <div style={{ position: "absolute", top: "20px", right: "30px" }}>
  <button
    style={{
      backgroundColor: "#ff4d4f",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 16px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/home"; // or navigate("/login") if using react-router
    }}
  >
    Logout
  </button>
</div>

      <div className="grid-item stats-card1 tile-small"><h2>👥 Customers</h2><p className="big">{counts.customers}</p><span>All registered customers</span></div>
      <div className="grid-item stats-card"><h2>🍭 Products</h2><p className="big">{counts.products}</p><span>Available in store</span></div>
      <div className="grid-item stats-card"><h2>📦 Orders</h2><p className="big">{counts.orders}</p><span>Placed by customers</span></div>

      <div className="grid-item pie-card tile-wide">
        <h3>📊 Category Distribution</h3>
        <div className="chart-wrapper">
          <Pie data={pieData} options={{ plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="grid-item category-list-card tile-small">
        <h3>📚 Categories</h3>
        <form onSubmit={handleCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Category Name" value={newCategory} onChange={e => setNewCategory(e.target.value)} required />
          <input type="text" placeholder="Description" value={newDescription} onChange={e => setNewDescription(e.target.value)} required />
          <button className="tb" type="submit">{editingCatId ? "Update" : "Add"} Category</button>
        </form>
        <ul className="category-list">
  {categories.map(cat => (
    <li key={cat.cid}>
      <strong>{cat.cname}</strong> — {cat.description}
      <div style={{ marginTop: '7px'}}>
        <button style={{ borderRadius:30}}  onClick={() => {
          setEditingCatId(cat.cid);
          setNewCategory(cat.cname);
          setNewDescription(cat.description);
        }}>Edit</button>
        <button onClick={() => handleDeleteCategory(cat.cid)} style={{ marginLeft: 8, backgroundColor: '#C70039', borderRadius:30}}>Delete</button>
      </div>
    </li>
  ))}
</ul>
      </div>

      <div className="grid-item table-card tile-short">
        <h3>🛠️ Product Management</h3>
        <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Name" value={newProduct.pname} onChange={e => setNewProduct({ ...newProduct, pname: e.target.value })} required />
          <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
          <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
          <select value={newProduct.category_id} onChange={e => setNewProduct({ ...newProduct, category_id: e.target.value })} required>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.cid} value={c.cid}>{c.cname}</option>)}
          </select>
          <input type="file" accept="image/*" onChange={e => setNewProduct({ ...newProduct, image: e.target.files[0] })} />
          <button type="submit">{editingId ? "Update" : "Add"} Product</button>
        </form>
      </div>

      <div className="grid-item table-card1 tile-tall">
        <h3>📦 Product List</h3>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Category</th><th>Image</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.pid}>
                  <td>{p.pid}</td>
                  <td>{p.pname}</td>
                  <td>${p.price}</td>
                  <td>{categories.find(c => c.cid === p.category_id)?.cname}</td>
                  <td>{p.image_url && <img src={`http://localhost:3000/uploads/${p.image_url}`} width="60" />}</td>
                  <td>
                <button  className="tb1" onClick={() => editProduct(p)}>Edit</button>
                    <button className="tb1" onClick={() => handleDeleteProduct(p.pid)} style={{ marginLeft: 0, backgroundColor: '#f55',marginTop:10 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-item table-card tile-medium">
        <h3>👤 Customers</h3>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Address</th></tr></thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.cid}>
                  <td>{c.cid}</td>
                  <td>{c.cname}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="ad2">
      <img src={pay} alt="Payment" className="ad1" />
      </div>
    </div>
  );
}

