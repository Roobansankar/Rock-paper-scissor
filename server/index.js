// require("dotenv").config();
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const morgan = require("morgan");
// const cors = require("cors");

// const corsOptions = {
//   origin: process.env.APPLICATION_URL,
//   methods: ["GET,POST"],
//   Credential: true,
// };

// // Middleware
// app.use(cors(corsOptions));
// app.use(morgan("dev"));
// app.use(express.json());

// // Router
// const infoRouter = require("./router");
// app.use("/info", infoRouter);

// // listen port
// const PORT = process.env.PORT || 5013;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

// // Db Connection
// mongoose
//   .connect("mongodb+srv://rooban175200:mueB8q3pdyY2wjqj@cluster0.vbtov.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() => console.log("Connected To MongoDB..."))
//   .catch((err) => console.log(err));

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// CORS options
// const corsOptions = {
//   origin: ["https://rps-client-6mfpx19hx-rooban-sankars-projects.vercel.app/"], // Allow your frontend URL
//   methods: ["GET", "POST"], // Allowed methods
//   credentials: true, // Corrected 'Credential' to 'credentials' to allow cookies/auth headers
// };

const corsOptions = {
  origin: "*", // Temporarily allow all origins for debugging
  methods: ["GET", "POST"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS middleware with the updated options
app.use(morgan("dev")); // Logging middleware
app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB schema and model
const infoSchema = mongoose.Schema({
  User1Name: {
    type: String,
    required: true,
    trim: true,
  },
  User2Name: {
    type: String,
    required: true,
    trim: true,
  },
  User1Result: {
    type: String,
    enum: ["Win", "Lose", "Tie"],
  },
  User2Result: {
    type: String,
    enum: ["Win", "Lose", "Tie"],
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
});

const Player = mongoose.model("player", infoSchema);

// Routes
app.post("/info", async (req, res) => {
  try {
    const data = new Player({
      User1Name: req.body.User1Name,
      User2Name: req.body.User2Name,
      User1Result: req.body.User1Result,
      User2Result: req.body.User2Result,
    });
    await data.save();
    res.status(201).json(data); // Return status 201 for creation
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.json("Hello everyone");
});

app.get("/info", async (req, res) => {
  try {
    const findData = await Player.find();
    res.status(200).json(findData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Listen port
const PORT = process.env.PORT || 5013;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// DB Connection
mongoose
  .connect(
    "mongodb+srv://rooban175200:mueB8q3pdyY2wjqj@cluster0.vbtov.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected To MongoDB..."))
  .catch((err) => console.log(err));
