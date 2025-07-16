import { useState } from "react";
import { client } from "../api/client";

export const useHandleRecipe =  () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRecipe = async (e) => {
    e.preventDefault()
  if (!ingredients.trim()) {
    setErrors({ ingredients: "Please enter some ingredients." });
    return;
  }
  setLoading(true);
  setRecipe(null);
  setErrors({});

  try {
    const { data } = await client.post("/api/v1/generate-recipe/", {
      ingredients,
    });
    setErrors({});
    setRecipe(data.recipe);
  } catch (error) {
    setErrors(error.response?.data || { non_field_errors: ["Server Error"] });
  } finally {
    setLoading(false);
  }
  }

  return { setIngredients, setErrors, setRecipe, recipe, errors, loading, handleRecipe, ingredients };
};