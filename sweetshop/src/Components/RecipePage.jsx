/**
 * RecipePage.jsx
 * -------------------------------------------------
 * • Hero banner (headline + CTAs)
 * • Sweet-browser card (hero image + ingredients & steps)
 * • Thumb rail     (switches preset desserts)
 * • AI Generator   (re-uses <RecipeGenerator />)
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeGenerator from "./RecipeGenerator";
import Banner from "./StudentHeroBanner";
import "../css/recipe-hero.css";

/* ---------- preset desserts that also appear on Home ---------- */
import cupCakeImg from "../assets/image copy 3.png";
import cookieImg  from "../assets/image copy 4.png";
import tiramisuImg from "../assets/image copy.png";
import macaronImg from "../assets/image copy 6.png";
import bg from "../assets/bf.png";
const staticRecipes = {
  cupcake: {
    title: "Vanilla Cupcake Delight",
    hero:  cupCakeImg,
    ingredients: [
      "1 ½ c flour","1 tsp baking powder","½ c butter","¾ c sugar",
      "2 eggs","1 tsp vanilla","½ c milk"
    ],
    steps: [
      "Oven to 175 °C • 350 °F.",
      "Cream butter & sugar until pale.",
      "Beat in eggs + vanilla.",
      "Fold dry mix, alternating with milk.",
      "Fill liners, bake 18-20 min."
    ]
  },
  cookie: {
    title:"Chocolate Chip Cookies",
    hero: cookieImg,
    ingredients:[
      "1 c butter","1 c brown sugar","2 eggs","2 c flour",
      "1 tsp soda","1 tsp vanilla","1 ½ c choc-chips"
    ],
    steps:[
      "Oven 190 °C.","Cream butter & sugars.",
      "Add eggs + vanilla.","Stir flour & soda, fold chips.",
      "Scoop, bake 10-12 min."
    ]
  },
  tiramisu:{
    title:"Quick-Set Tiramisu Cups",
    hero:tiramisuImg,
    ingredients:[
      "200 g mascarpone","¾ c heavy cream","¼ c sugar",
      "1 c espresso","Ladyfingers","Cocoa dust"
    ],
    steps:[
      "Whip mascarpone, cream, sugar.",
      "Dip fingers in espresso, layer.",
      "Chill 2 h, dust cocoa."
    ]
  },
  macaron:{
    title:"Strawberry Macarons",
    hero: macaronImg,
    ingredients:[
      "100 g almond flour","100 g icing sugar","80 g egg whites",
      "80 g sugar","Pink gel","Strawberry butter-cream"
    ],
    steps:[
      "Sift dries twice.","Whip stiff meringue.",
      "Macaronage, pipe, rest 30 min.",
      "Bake 150 °C 14 min.","Fill, mature 24 h."
    ]
  }
};
/* -------------------------------------------------------------- */

export default function RecipePage(){
  const { dish }      = useParams();
  const initKey       = (dish||"cupcake").toLowerCase();
  const [key,setKey]  = useState(initKey);
  const recipe        = staticRecipes[key];

  useEffect(()=>{ setKey(initKey); },[initKey]);

  if(!recipe) return <h2 style={{textAlign:"center",marginTop:80}}>Recipe not found</h2>;

  return(
    <div>
       
        
    <main className="chef-hero">
 
      {/* ── Bold banner headline ─────────────────────── */}
       <header className="tribe-banner">
       
      <Banner/>
     </header> 

      {/* ── VR-concert-style browser card ─────────────── */}
<div className="rg-ch">
      {/* ── AI generator (next section) ───────────────── */}
      <RecipeGenerator />
      </div>
      <section className="sweet-browser">
            <h1>Recipies</h1>
        <div className="browser-hero">
          <img src={recipe.hero} alt={recipe.title}/>
          <h2>{recipe.title}</h2>
        </div>

        <aside className="browser-info">
          <h4>Ingredients</h4>
          <ul className="pill-list">{recipe.ingredients.map((i,idx)=><li key={idx}>{i}</li>)}</ul>
          <h4 style={{marginTop:20}}>Steps</h4>
          <ol className="step-list">{recipe.steps.map((s,idx)=><li key={idx}>{s}</li>)}</ol>
        </aside>

        <div className="thumb-rail">
          {Object.entries(staticRecipes).map(([k,r])=>(
            <div key={k} className={`thumb-card ${k===key?"sel":""}`} onClick={()=>setKey(k)}>
              <img src={r.hero} alt={r.title}/><span>{r.title}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="chef-divider"/>

    </main>
    </div>
  );
}
