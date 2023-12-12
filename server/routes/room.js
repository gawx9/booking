const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

const multer = require("multer");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/rooms/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint for adding a room
router.post("/rooms", upload.array("image", 5), roomController.addRoom);

router.delete("/rooms/:id", roomController.deleteRoom);
router.get("/rooms", roomController.getAllRooms);

module.exports = router;
