// import React from 'react'
import axios from "axios";
import "../../css/productsadmin.css";
import React, { useState, useEffect } from "react";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/categories", {
        // cid: Math.floor(Math.random() * 1000),
        cname: newCategory,
        description: newDescription,
      });
      setCategories([
        ...categories,
        res.data, // Assuming the API returns the new category object
      ]);

      setNewCategory("");
      setNewDescription("");
    } catch (err) {
      console.error("Error adding category:", err);
    }

    console.log("Sending:", {
      cname: newCategory,
      description: newDescription,
    });
    console.log({
      cname: newCategory,
      description: newDescription,
    });
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/categories/${editingId}`,
        {
          cname: newCategory,
          description: newDescription,
        }
      );
      setCategories(
        categories.map((cat) => (cat.cid === editingId ? res.data : cat))
      );
      setEditingId(null);
      setNewCategory("");
      setNewDescription("");
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const startEditing = (category) => {
    setEditingId(category.cid);
    setNewCategory(category.cname);
    setNewDescription(category.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setNewCategory("");
    setNewDescription("");
  };

  const handleDelete = async (cid) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:3000/api/categories/${cid}`);
        setCategories(categories.filter((cat) => cat.cid !== cid));
        alert("Category deleted successfully!");
      } catch (err) {
        console.error("Error deleting category:", err);
        alert(
          "Error: " + (err.response?.data?.error || "Failed to delete catgory")
        );
      }
    }
  };

  return (
    <div className="admin-categories">
      <h2>Category Management</h2>

      <form onSubmit={editingId ? handleUpdateCategory : handleAddCategory}>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          required
        />
        <button type="submit">
          {editingId ? "Update Category" : "Add Category"}
        </button>

        {editingId && (
          <button type="button" onClick={cancelEditing}>
            Cancel
          </button>
        )}
      </form>

      <ul>
        {categories.map((category) => (
          <li key={category.cid}>
            <strong>{category.cname}</strong> — {category.description}
            <button onClick={() => startEditing(category)}>Edit</button>
            <button
              onClick={() => handleDelete(category.cid)}
              style={{ marginLeft: "8px", backgroundColor: "#ff4444" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesManagement;
