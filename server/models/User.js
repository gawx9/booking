const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  isAdmin: { type: Boolean, default: false },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
  },
  password: { type: String, required: [true, "Password is required"] },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
