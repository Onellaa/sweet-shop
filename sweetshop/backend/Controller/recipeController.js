import OpenAI from "openai";



const openai = new OpenAI({
  apiKey:
    "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", // 🔐 Replace this with your actual key
  dangerouslyAllowBrowser: true, // ✅ Needed for web testing
});

export const generateRecipe = async (req, res) => {
  const { mode, ingredients, dishName, mealType, servings } = req.body;

  let prompt = "";

  if (mode === "ingredients") {
    prompt = `Generate a recipe using only these ingredients: ${ingredients}. 
    Make it suitable for ${mealType} and for ${servings} people. 
    Include a recipe name, ingredient list, and step-by-step instructions.`;
  } else {
    prompt = `Give me a beginner-friendly recipe for "${dishName}". 
    Include a list of ingredients, instructions, and make it for ${servings} people. 
    Suggest it as a ${mealType} meal.`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ recipe: completion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
};
