const express = require("express");
const router = express.Router();
router.use(express.json());

const { addUser, verifyUser, getAllUsers } = require("../controllers/userController");

router.get("/user-34389792", getAllUsers);
router.post("/login-34389792", verifyUser);
router.post("/register-34389792", addUser);

module.exports = router;
