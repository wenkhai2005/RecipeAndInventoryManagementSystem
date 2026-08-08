const express = require("express");
const router = express.Router();
router.use(express.json());


const {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  deleteRecipe,
  updateRecipe
} = require("../controllers/recipeController");

router.get("/recipes-34389792", getAllRecipes);
router.get("/recipes-34389792/:id", getRecipeById);
router.post("/add-recipe-34389792", addRecipe);
router.delete("/delete-recipe-34389792/:id", deleteRecipe);
router.put("/edit-recipe-34389792/:id", updateRecipe);


module.exports = router;
