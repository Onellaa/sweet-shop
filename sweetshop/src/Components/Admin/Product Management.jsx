import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/productsadmin.css";
import AdminSidebar from "../Admin/AdminSidebar";
const ProductManagement = () => {
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

  // Fetch products and categories on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productRes, categoriesRes] = await Promise.all([
        axios.get("http://localhost:3000/api/products"),
        axios.get("http://localhost:3000/api/categories"),
      ]);
      setProducts(productRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Handle form submission for both add and update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pname", newProduct.pname);
    formData.append("category_id", newProduct.category_id);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);

    // Only append image if it exists (for update) or is new (for create)
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }

    try {
      // Determine the URL and method
      const url = editingId
        ? `http://localhost:3000/api/products/${editingId}`
        : "http://localhost:3000/api/products";

      const method = editingId ? "put" : "post";

      // Make the request
      await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh the product list
      fetchData();

      // Reset the form
      setEditingId(null);
      setNewProduct({
        pid: "",
        pname: "",
        category_id: "",
        price: "",
        description: "",
        image: null,
      });
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Error: " + (err.response?.data?.error || err.message));
    }
  };

  // Set up form for editing a product
  const startEditing = (product) => {
    setEditingId(product.pid);
    setNewProduct({
      pid: product.pid,
      pname: product.pname,
      category_id: product.category_id,
      price: product.price,
      description: product.description,
      image_url: product.image_url,
      image: null, // Reset image file input
    });
  };

  const handleDelete = async (pid) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${pid}`);
        // Update the UI by removing the deleted product
        setProducts(products.filter((product) => product.pid !== pid));
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Error deleting the product:", err);
        alert(
          "Error: " + (err.response?.data?.error || "Failed to delete product")
        );
      }
    }
  };

  return (
    <div className="admin-product1">
    <div>

    </div>
       
      <h2>Product Management</h2>

      {/* Product Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.pname}
          onChange={(e) =>
            setNewProduct({ ...newProduct, pname: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Price"
          step="0.01"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />

        <select
          value={newProduct.category_id}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category_id: e.target.value })
          }
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.cid} value={cat.cid}>
              {cat.cname}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.files[0] })
          }
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setNewProduct({
                pid: "",
                pname: "",
                category_id: "",
                price: "",
                description: "",
                image: null,
              });
            }}
            className="cancel-btn"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Products Table */}
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.pid}>
              <td>{product.pid}</td>
              <td>{product.pname}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                {categories.find((c) => c.cid === product.category_id)?.cname ||
                  "N/A"}
              </td>
              <td>
                {product.image_url && (
                  <img
                    src={`http://localhost:3000/uploads/${product.image_url}`}
                    alt={product.pname}
                    width="80"
                    height="80"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                )}
              </td>
              <td>
                <button
                  onClick={() => startEditing(product)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.pid)}
                  style={{ marginLeft: "8px", backgroundColor: "#ff4444" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    
  );
};

export default ProductManagement;
