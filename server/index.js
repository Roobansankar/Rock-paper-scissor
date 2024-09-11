// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const morgan = require("morgan");
// const cors = require("cors");

// const app = express();

// // CORS configuration
// const corsOptions = {
//   origin: process.env.APPLICATION_URL,
//   methods: "GET,HEAD,PUT,PATCH",
// };

// // Middleware
// app.use(cors(corsOptions));
// app.use(morgan("dev"));
// app.use(express.json());

// // MongoDB Connection Handling
// let cachedDb = null;
// async function connectToDatabase(uri) {
//   if (cachedDb) return cachedDb;
//   const db = await mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   cachedDb = db;
//   console.log("Connected to MongoDB");
//   return cachedDb;
// }

// // Simple route to handle root URL (prevent 404 error)
// // app.get("/", (req, res) => {
// //   res.send("API is running...");
// // });

// // Router
// const infoRouter = require("./router");
// app.use("/info", infoRouter);

// // Listen on the specified port or default to 5013
// const PORT = process.env.PORT || 5013;
// app.listen(PORT, async () => {
//   try {
//     await connectToDatabase(process.env.MONGODB_URL);
//     console.log(`Server running on port ${PORT}`);
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   }
// });

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

// Schema definition
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

const InfoRouter = mongoose.model("player", infoSchema);

// Routes
app.post("/info", async (req, res) => {
  try {
    const data = new InfoRouter({
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

app.get("/info", async (req, res) => {
  try {
    const findData = await InfoRouter.find();
    res.status(200).json(findData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
