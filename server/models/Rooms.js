const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  image: { type: [String], required: true },
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String, required: [true, "Description is required"] },
  accommodation: { type: Number, required: [true, "Accomodation is required"] },
  person: { type: Number, required: [true, "Person is required"] },
  price: { type: Number, required: [true, "Price is required"] },

  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
