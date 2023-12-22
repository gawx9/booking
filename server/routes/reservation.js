const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const authenticateJWT = require("../middleware/authMiddleware");
// Endpoint for get all reservation
router.get("/reservations", reservationController.getAllReservations);

router.delete("/reservations/:id", reservationController.deleteReservation);

// Define the route to get reservations by user _id
router.get("/reservations-user", reservationController.getReservationsByUserId);

// Confirm reservation
router.put(
  "/reservations/:id/confirm",
  reservationController.confirmReservation
);

// Cancel reservation
router.put("/reservations/:id/cancel", reservationController.cancelReservation);
module.exports = router;
