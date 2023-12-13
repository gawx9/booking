const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", userController.getAllUsers);
router.delete("/users/:id", userController.deleteUser);
router.post("/reservation", authenticateJWT, userController.requestReservation);

module.exports = router;
