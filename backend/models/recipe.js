const mongoose = require("mongoose");

function generateRecipeId() {
  const no = Math.floor(Math.random() * 99999);
  return "R-" + no.toString().padStart(5, "0");
}

const RecipeSchema = new mongoose.Schema({
  recipeId: {
    type: String,
    default: generateRecipeId,
    unique: true,
  },
  userId: {
    type: String,
    required: [true, "User ID is required"], 
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Recipe title is required"],
    minlength: 3,
    maxlength: 100,
    match: [/^[A-Za-z ]+$/, "Title can only contain letters and spaces"],
  },
  chef: {
    type: String,
    required: [true, "Chef name is required"],
    minlength: 2,
    maxlength: 100,
    match: [/^[A-Za-z '-]+$/, "Chef name can only contain letters, spaces, and hyphens"],
  },
  ingredients: {
    type: [String],
    required: [true, "Ingredients are required"],
    validate: {
      validator: arr => arr.length > 0,
      message: "At least one ingredient required",
    },
  },
  instructions: {
    type: [String],
    required: [true, "Instructions are required"],
    validate: {
      validator: arr => arr.length > 0,
      message: "At least one instruction required",
    },
  },
  mealType: { type: String, required: [true, "Meal type is required"] },
  cuisineType: { type: String, required: [true, "Cuisine type is required"] },
  prepTime: { type: Number, required: [true, "Preparation time required"], min: 1 },
  difficulty: { type: String, required: [true, "Difficulty level required"] },
  servings: { type: Number, required: [true, "Servings required"], min: 1 },

  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

RecipeSchema.index({ userId: 1, title: 1 }, { unique: true });

RecipeSchema.pre("save", function (next) {
  this.updatedDate = Date.now();
  next();
});

RecipeSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedDate: Date.now() });
  next();
});

module.exports = mongoose.model("Recipe", RecipeSchema);
