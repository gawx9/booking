const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const User = require("../models/User");
const Reservation = require("../models/Reservation");
// Endpoint for get all reservation
router.get("/reservations", reservationController.getAllReservations);

router.delete("/reservations/:id", reservationController.deleteReservation);

// Define the route to get reservations by user _id
router.get("/reservations/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find reservations based on the user's _id
    const reservations = await Reservation.find({ user: userId });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
