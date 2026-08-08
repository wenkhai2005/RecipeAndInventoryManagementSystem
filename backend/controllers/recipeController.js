const Recipe = require("../models/recipe");
const User = require("../models/user");

async function getAllRecipes(req, res) {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getRecipeById(req, res) {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findOne({ recipeId: id });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function addRecipe(req, res) {
  try {
    const { userId, title } = req.body;

    if (!/^U-\d{5}$/.test(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid userId format. Must be U-XXXXX." });
    }

    const userExists = await User.findOne({ userId });
    if (!userExists) {
      return res
        .status(404)
        .json({ message: "User ID not found. Please register first." });
    }

    const duplicate = await Recipe.findOne({ userId, title: title.trim() });
    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Duplicate recipe title for this user." });
    }

    const recipe = await Recipe.create(req.body);
    res.status(201).json({
      message: "Recipe added successfully.",
      recipe,
    });
  } catch (e) {
    console.error("Add Recipe Error:", e);
    res.status(400).json({ message: e.message });
  }
}

async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Recipe.findOneAndDelete({ recipeId: id });
    if (!deleted) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Deleted successfully.", deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateRecipe(req, res) {
  try {
    const { id } = req.params;
    const {
      userId,
      title,
      chef,
      ingredients,
      instructions,
      mealType,
      cuisineType,
      prepTime,
      difficulty,
      servings,
    } = req.body;

    if (!/^U-\d{5}$/.test(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid userId format. Must be U-XXXXX." });
    }

    const userExists = await User.findOne({ userId });
    if (!userExists) {
      return res
        .status(404)
        .json({ message: "User ID not found. Please register first." });
    }

    const existingRecipe = await Recipe.findOne({ userId, title: title.trim() });
    if (existingRecipe && existingRecipe.recipeId !== id) {
      return res
        .status(400)
        .json({ message: "Duplicate recipe title for this user." });
    }

    const ingredientList = Array.isArray(ingredients)
      ? ingredients.map((i) => i.trim())
      : ingredients
      ? ingredients.split("\n").map((i) => i.trim()).filter((i) => i)
      : [];

    const instructionList = Array.isArray(instructions)
      ? instructions.map((i) => i.trim())
      : instructions
      ? instructions.split("\n").map((i) => i.trim()).filter((i) => i)
      : [];

    const updated = await Recipe.findOneAndUpdate(
      { recipeId: id },
      {
        userId,
        title: title.trim(),
        chef: chef.trim(),
        ingredients: ingredientList,
        instructions: instructionList,
        mealType,
        cuisineType,
        prepTime,
        difficulty,
        servings,
        updatedDate: new Date(), 
      },
      { new: true, runValidators: true } 
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Recipe not found or not updated." });
    }

    res.json({ message: "Recipe updated successfully.", updated });
  } catch (err) {
    console.error("updateRecipe error:", err);
    res.status(500).json({
      message: "Database error while updating recipe.",
      error: err.message,
    });
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  deleteRecipe,
  updateRecipe,
};
