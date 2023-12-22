const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
