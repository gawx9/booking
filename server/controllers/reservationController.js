const Reservation = require("../models/Reservation");

// Get all reservation
const getAllReservations = async (req, res) => {
  try {
    // Retrieve all reservations
    const reservations = await Reservation.find().populate("user room");

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Reservation
const deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    // Check if the reservation exists
    const existingReservation = await Reservation.findById(reservationId);
    if (!existingReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Use deleteOne to remove the reservation
    await Reservation.deleteOne({ _id: reservationId });

    // Optionally, you may want to update associated user and room records

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllReservations,
  deleteReservation,
};
