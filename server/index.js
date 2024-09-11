require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.APPLICATION_URL,
  methods: "GET,HEAD,PUT,PATCH",
};

// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// MongoDB Connection Handling
let cachedDb = null;
async function connectToDatabase(uri) {
  if (cachedDb) return cachedDb; 
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); 
  cachedDb = db;
  console.log("Connected to MongoDB");
  return cachedDb;
}

// Simple route to handle root URL (prevent 404 error)
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// Router
const infoRouter = require("./router");
app.use("/info", infoRouter);

// Listen on the specified port or default to 5013
const PORT = process.env.PORT || 5013;
app.listen(PORT, async () => {
  try {
    await connectToDatabase(process.env.MONGODB_URL);
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
});
