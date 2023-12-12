const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  image: { type: [String], required: true },
  title: { type: String, required: true },
  accommodation: { type: Number, required: true },
  person: { type: Number, required: true },
  price: { type: Number, required: true },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
