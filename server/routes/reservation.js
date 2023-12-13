const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Endpoint for get all reservation
router.get("/reservations", reservationController.getAllReservations);

router.delete("/reservations/:id", reservationController.deleteReservation);

// Define the route to get reservations by user _id
router.get("/reservations-user", reservationController.getReservationsByUserId);

module.exports = router;
