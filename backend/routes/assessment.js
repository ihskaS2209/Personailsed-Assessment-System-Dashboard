const express = require("express");
const router = express.Router();
const Assessment = require("../models/Assessment");
const {
  authenticateToken,
  checkRole,
} = require("../middleware/authMiddleware");


// Create a new assessment
router.post("/", authenticateToken, checkRole("teacher"), async (req, res) => {
  try {
    const { teacher, question, choices, justification } = req.body;
    const assessment = new Assessment({
      teacher,
      question,
      choices,
      justification,
    });
    await assessment.save();
    res.status(201).json({ message: "Assessment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Assessment creation failed" });
  }
});

// Get all assessments
router.get("/", async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch assessments" });
  }
});

module.exports = router;
