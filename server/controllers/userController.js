const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Reservation = require("../models/Reservation");
const Room = require("../models/Rooms");
// Register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET
    );

    res
      .status(201)
      .json({ message: "Registration successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { name: user.name, email: user.email, _id: user._id },
      process.env.JWT_SECRET
    );

    // Include user's name and email in the response
    res.json({
      message: "Login Successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting all users", error);
    res.status(500).json({ message: "Failed to get all users" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    // Get user ID from the request parameters
    const userId = req.params.id;

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await existingUser.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const requestReservation = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;

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

      // Check if the room exists
      const existingRoom = await Room.findById(roomId);
      if (!existingRoom) {
        return res.status(404).json({ message: "Room not found" });
      }

      // Create a new reservation
      const reservation = new Reservation({
        user: userId,
        room: roomId,
        checkIn,
        checkOut,
      });
      await reservation.save();

      // Update user and room with the reservation
      existingUser.reservations.push(reservation._id);
      await existingUser.save();

      existingRoom.reservations.push(reservation._id);
      await existingRoom.save();

      res.status(201).json({ message: "Reservation requested successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  register,
  login,
  getAllUsers,
  deleteUser,
  requestReservation,
};
