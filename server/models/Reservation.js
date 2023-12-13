const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
