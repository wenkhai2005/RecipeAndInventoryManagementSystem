const UserInventory = require("../models/userInventory");
const User = require("../models/user");

async function addInventory(req, res) {
  try {
    const { userId, ingredientName } = req.body;

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

    const duplicate = await UserInventory.findOne({
      userId,
      ingredientName: ingredientName.trim(),
    });
    if (duplicate) {
      return res
        .status(400)
        .json({ message: "Duplicate ingredient for this user." });
    }

    const item = new UserInventory(req.body);
    const saved = await item.save();
    res.status(201).json({
      message: "Inventory item added successfully.",
      inventory: saved,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getAllInventories(req, res) {
  try {
    const result = await UserInventory.aggregate([
      { $group: { _id: null, totalValue: { $sum: "$cost" } } },
    ]);
    const totalValue = result.length > 0 ? result[0].totalValue : 0;

    const lowStock = await UserInventory.find({ quantity: { $lte: 3 } });
    const items = await UserInventory.find({});

    res.json({
      inventories: items,
      lowStock,
      totalValue,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getInventoryById(req, res) {
  try {
    const { id } = req.params;
    const item = await UserInventory.findOne({ inventoryId: id });
    if (!item) {
      return res.status(404).json({ message: "Inventory item not found." });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateInventory(req, res) {
  try {
    const { id } = req.params;
    const { userId, ingredientName } = req.body;

    if (req.body.purchaseDate && typeof req.body.purchaseDate === "string") {
      req.body.purchaseDate = new Date(req.body.purchaseDate + "T00:00:00Z");
    }
    if (req.body.expirationDate && typeof req.body.expirationDate === "string") {
      req.body.expirationDate = new Date(req.body.expirationDate + "T00:00:00Z");
    }

    if (
      !req.body.purchaseDate ||
      !req.body.expirationDate ||
      isNaN(req.body.purchaseDate) ||
      isNaN(req.body.expirationDate)
    ) {
      return res.status(400).json({
        message: "Invalid or missing date fields (purchaseDate / expirationDate).",
      });
    }

    const userExists = await User.findOne({ userId });
    if (!userExists) {
      return res.status(404).json({ message: "User ID not found. Please register first." });
    }

    const existing = await UserInventory.findOne({
      userId,
      ingredientName: ingredientName.trim(),
    });
    if (existing && existing.inventoryId !== id) {
      return res.status(400).json({ message: "Duplicate ingredient for this user." });
    }

    const updated = await UserInventory.findOneAndUpdate(
      { inventoryId: id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Inventory item not found." });
    }

    res.json({ message: "Inventory updated successfully.", updated });
  } catch (err) {
    console.error("Error updating inventory:", err);
    res.status(400).json({ message: err.message });
  }
}



async function deleteInventory(req, res) {
  try {
    const { id } = req.params;
    const deleted = await UserInventory.findOneAndDelete({ inventoryId: id });
    if (!deleted) {
      return res.status(404).json({ message: "Inventory item not found." });
    }
    res.json({ message: "Inventory deleted successfully.", deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function totalInventoryValue(req, res) {
  try {
    const result = await UserInventory.aggregate([
      { $group: { _id: null, totalValue: { $sum: "$cost" } } },
    ]);
    const totalValue = result.length > 0 ? result[0].totalValue : 0;
    res.json({ totalValue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  addInventory,
  getAllInventories,
  getInventoryById,
  updateInventory,
  deleteInventory,
  totalInventoryValue,
};
