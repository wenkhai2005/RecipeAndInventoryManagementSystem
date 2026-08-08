const User = require("../models/user");

async function addUser(req, res) {
  try {
    const { email, password, fullname, role, phone } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res
        .status(400)
        .json({ message: "Phone number already in use by another user." });
    }

    const user = await User.create({ email, password, fullname, role, phone });

    res.status(201).json({
      message: "User registered successfully.",
      userId: user.userId,
    });
  } catch (err) {
    console.error("addUser error:", err);
    res.status(400).json({ message: err.message });
  }
}

async function verifyUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    res.status(200).json({
      message: "Login successful.",
      userId: user.userId,
      fullname: user.fullname,
      role: user.role,
      email: user.email,
    });
  } catch (err) {
    console.error("verifyUser error:", err);
    res.status(500).json({ message: err.message || "Login failed." });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { addUser, verifyUser, getAllUsers };
