const mongoose = require("mongoose");

function generateUserId() {
  let no = Math.floor(Math.random() * 99999);
  return "U-" + no.toString().padStart(5, "0");
}

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: generateUserId,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"], 
    match: [/^[^@]+@[^@]+\.[^@]+$/, "Email must contain @ and end with .com"],
    unique: true, 
  },
  password: {
    type: String,
    required: [true, "Password is required"], 
    validate: {
      validator: function (value) {
        if (value.length < 8) return false;

        let hasUpper = false;
        let hasLower = false;
        let hasNumber = false;
        let hasSpecial = false;
        const specialCharacters = "~!@#$%^&*?|-=+_/";

        for (let i = 0; i < value.length; i++) {
          const char = value[i];
          if (char >= "A" && char <= "Z") hasUpper = true;
          else if (char >= "a" && char <= "z") hasLower = true;
          else if (char >= "0" && char <= "9") hasNumber = true;
          else if (specialCharacters.includes(char)) hasSpecial = true;
        }
        return hasUpper && hasLower && hasNumber && hasSpecial;
      },
      message:
        "Password must be at least 8 chars, with uppercase, lowercase, number, and special char",
    },
  },
  fullname: {
    type: String,
    required: [true, "Full name is required"], 
    minlength: 2,
    maxlength: 100,
    match: [
      /^[A-Za-z '-]+$/,
      "Full name can only contain letters, spaces, hyphens, and apostrophes",
    ],
  },
  role: {
    type: String,
    enum: ["admin", "chef", "manager", "other"],
    required: [true, "Role is required"], 
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Phone number is required"], 
    match: [/^(?:\+61|0)[0-9]{9}$/, "Invalid phone number format"],
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now, 
  },
});

UserSchema.index({ phone: 1 }, { unique: true });

UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

UserSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model("User", UserSchema);
