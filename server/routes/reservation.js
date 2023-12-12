const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Endpoint for get all reservation
router.get("/reservations", reservationController.getAllReservations);

router.delete("/reservations/:id", reservationController.deleteReservation);
module.exports = router;
