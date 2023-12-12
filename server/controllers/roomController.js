const Room = require("../models/Rooms");

// add room
const addRoom = async (req, res) => {
  try {
    const { title, accommodation, person, price } = req.body;

    // Get the paths of the uploaded images
    const image = req.files.map((file) => file.path);

    const room = new Room({
      image,
      title,
      accommodation,
      person,
      price,
    });
    await room.save();

    res.status(201).json({ message: "Room added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  try {
    // Get room ID from the request parameters
    const roomId = req.params.id;

    // Check if the room exists
    const existingRoom = await Room.findById(roomId);
    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Delete the room
    await existingRoom.deleteOne();

    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    // Retrieve all rooms
    const rooms = await Room.find();

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addRoom,
  deleteRoom,
  getAllRooms,
};
