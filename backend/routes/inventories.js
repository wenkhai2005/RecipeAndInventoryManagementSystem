const express = require("express");
const router = express.Router();
router.use(express.json());

const {
  getAllInventories,
  getInventoryById,
  addInventory,
  deleteInventory,
  updateInventory
} = require("../controllers/inventoryController");

router.get("/inventory-34389792", getAllInventories);
router.get("/inventory-34389792/:id", getInventoryById);
router.post("/add-inventory-34389792", addInventory);
router.delete("/delete-inventory-34389792/:id", deleteInventory);
router.put("/edit-inventory-34389792/:id", updateInventory);

module.exports = router;
