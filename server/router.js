const express = require("express");
const router = express.Router();
const InfoRouter = require("./infoSchema");

// Create new data
router.post("/", async (req, res) => {
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

// Get all data
// router.get("/", async (req, res) => {
//   try {
//     const findData = await InfoRouter.find();
//     res.status(200).json(findData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = router;
