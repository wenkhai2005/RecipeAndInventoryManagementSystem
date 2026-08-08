const mongoose = require("mongoose");

function generateInventoryId() {
  let no = Math.floor(Math.random() * 99999);
  return "I-" + no.toString().padStart(5, "0");
}

const UserInventorySchema = new mongoose.Schema({
  inventoryId: {
    type: String,
    default: generateInventoryId,
    unique: true,
  },
  userId: {
    type: String,
    ref: "User",
    required: [true, "User ID is required"], 
  },
  ingredientName: {
    type: String,
    required: [true, "Ingredient name is required"], 
    minlength: 2,
    maxlength: 50,
    match: [
      /^[A-Za-z -]+$/,
      "Ingredient name can only contain letters, spaces, and hyphens",
    ],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0.01, "Quantity must be at least 0.01"],
    max: [9999, "Quantity cannot exceed 9999"],
  },
  unit: {
    type: String,
    required: [true, "Unit is required"],
    enum: [
      "pieces",
      "kg",
      "g",
      "liters",
      "ml",
      "cups",
      "tbsp",
      "tsp",
      "dozen",
    ],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: [
      "Vegetables",
      "Fruits",
      "Meat",
      "Dairy",
      "Grains",
      "Spices",
      "Beverages",
      "Frozen",
      "Canned",
      "Other",
    ],
  },
  purchaseDate: {
    type: Date,
    required: [true, "Purchase date is required"],
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "Purchase date cannot be in the future",
    },
  },
expirationDate: {
  type: Date,
  required: [true, "Expiration date is required"],
  validate: {
    validator: function (value) {
 
      if (!this.purchaseDate || !value) return true;
      const purDate = new Date(this.purchaseDate);
      const expDate = new Date(value);

      const pur = new Date(purDate.toISOString().split("T")[0]);
      const exp = new Date(expDate.toISOString().split("T")[0]);
      return exp >= pur;
    },
    message: "Expiration date must be after purchase date",
  },
},

  location: {
    type: String,
    required: [true, "Location is required"],
    enum: ["Fridge", "Freezer", "Pantry", "Counter", "Cupboard"],
  },
  cost: {
    type: Number,
    required: [true, "Cost is required"],
    min: [0.01, "Cost must be at least $0.01"],
    max: [999.99, "Cost cannot exceed $999.99"],
    validate: {
      validator: function (value) {
        return Number.isInteger(value * 100);
      },
      message: "Cost can have up to 2 decimal places",
    },
  },
  createdDate: {
    type: Date,
    default: Date.now, 
  },
  updatedDate: {
    type: Date,
    default: Date.now, 
  },
});


UserInventorySchema.pre("save", function (next) {
  this.updatedDate = Date.now();
  next();
});

UserInventorySchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedDate: Date.now() });
  next();
});

module.exports = mongoose.model("UserInventory", UserInventorySchema);
