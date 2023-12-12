const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const path = require("path");

const app = express();

const port = process.env.PORT || 5000;

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error.bind(`MongoDb connection error: ${err}`.underline.red);
});

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB`.underline.green);
});

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
const userRoutes = require("./routes/user");
const roomRoutes = require("./routes/room");
const reservationRoutes = require("./routes/reservation");
// Endpoints
app.use("/api", userRoutes);
app.use("/api", roomRoutes);
app.use("/api", reservationRoutes);

// Listening on port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`.underline.yellow);
});
