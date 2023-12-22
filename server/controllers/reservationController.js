const Reservation = require("../models/Reservation");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const io = require("socket.io");

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

const getReservationsByUserId = async (req, res) => {
  try {
    // Authorization check
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Get user ID from the token
      const userId = user._id;

      // Check if the user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Fetch reservations and populate the 'room' field
      const reservations = await Reservation.find({ user: userId }).populate(
        "room"
      );

      res.status(200).json(reservations);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm reservation controller method
const confirmReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status: "Approved", message: "Your booking has been approved" },
      { new: true }
    );

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error confirming reservation" });
  }
};

// Cancel reservation controller method
const cancelReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status: "Canceled" },
      { new: true }
    );

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error canceling reservation" });
  }
};

module.exports = {
  getAllReservations,
  deleteReservation,
  getReservationsByUserId,
  confirmReservation,
  cancelReservation,
};
