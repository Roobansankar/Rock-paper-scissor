require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const corsOptions = {
  origin: process.env.APPLICATION_URL,
  methods: "GET,POST,PUT,PATCH",
};

// Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Router
const infoRouter = require("./router");
app.use("/info", infoRouter);

// listen port
const PORT = process.env.PORT || 5013;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Db Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected To MongoDB..."))
  .catch((err) => console.log(err));
