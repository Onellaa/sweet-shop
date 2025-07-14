/**
 * RecipeGenerator.jsx
 * -------------------------------------------------
 * Matches the “floating kitchen-card” mock-up:
 * • Same gradient background
 * • Glassy card with input & controls
 * • Bubbles for generated ingredients
 */
import React, { useState } from "react";
import axios from "axios";
import "../css/recipe-hero.css";

export default function RecipeGenerator(){
  const [mode,setMode]         = useState("ingredients");
  const [ingredients,setIngr]  = useState("");
  const [dish,setDish]         = useState("");
  const [meal,setMeal]         = useState("Any");
  const [serve,setServe]       = useState(2);
  const [result,setRes]        = useState("");

  async function handleGenerate(){
    try{
      const {data} = await axios.post("http://localhost:3000/api/recipe",{
        mode,ingredients,dishName:dish,mealType:meal,servings:serve
      });
      setRes(data.recipe);
    }catch(e){ alert("Failed to generate"); }
  }

  /* turn bullet lines into “bubble pills” */
  const lines = result.split(/\n+/).filter(Boolean);

  return(
    <section className="kitchen-wrap">
      {/* glass card */}
      <div className="kitchen-card">
        <h2>Create a Recipe in Seconds 👩‍🍳</h2>

        <div className="input-row">
          <input
            placeholder="Type ingredients or dish name…"
            value={mode==="ingredients"?ingredients:dish}
            onChange={e=> mode==="ingredients"?setIngr(e.target.value):setDish(e.target.value)}
          />
          <button onClick={handleGenerate}>Generate</button>
        </div>

        <div className="field-grid">
          <label>Mode
            <select value={mode} onChange={e=>setMode(e.target.value)}>
              <option value="ingredients">I have ingredients</option>
              <option value="dish">I want this dish</option>
            </select>
          </label>

          <label>Meal&nbsp;Type
            <select value={meal} onChange={e=>setMeal(e.target.value)}>
              {["Any","Breakfast","Lunch","Dinner","Snack"].map(m=><option key={m}>{m}</option>)}
            </select>
          </label>

          <label>Servings
            <input type="number" min={1} value={serve} onChange={e=>setServe(e.target.value)}/>
          </label>
        </div>
      </div>

      {/* result bubbles */}
      {result && (
        <div className="result-bubble-box">
          {lines.map((t,i)=>(
            <span key={i} className="bubble-pill">{t}</span>
          ))}
        </div>
      )}
    </section>
  );
}
