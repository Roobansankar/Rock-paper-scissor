require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// CORS options
const corsOptions = {
  origin: process.env.APPLICATION_URL,
  methods: "GET,HEAD,PUT,PATCH",
};

// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Cached database connection to improve performance
let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  // Establish MongoDB connection
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = db;
  console.log("Connected to MongoDB...");
  return cachedDb;
}

// DB Connection Initialization
connectToDatabase(process.env.MONGODB_URL).catch((err) =>
  console.error("Error connecting to MongoDB:", err)
);

// Router
const infoRouter = require("./router");
app.use("/info", infoRouter);

// Listen on the specified port or default to 5013
const PORT = process.env.PORT || 5013;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
