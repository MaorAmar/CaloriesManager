const express = require("express");
const Calorie = require("../models/calorie");
const router = express.Router();

// הוספת פרטי קלוריות
router.post("/", async (req, res) => {
  const { user_id, year, month, day, description, category, amount } = req.body;

  try {
    const newCalorie = new Calorie({
      user_id,
      year,
      month,
      day,
      description,
      category,
      amount,
    });

    await newCalorie.save();
    res.status(201).json(newCalorie);
  } catch (err) {
    res.status(500).json({ message: "Error adding calorie item", error: err });
  }
});

// דו"ח קלוריות
router.get("/report", async (req, res) => {
  const { user_id, year, month } = req.query;

  try {
    const calories = await Calorie.find({
      user_id,
      year,
      month,
    });

    const report = {
      breakfast: [],
      lunch: [],
      dinner: [],
      other: [],
    };

    // עיבוד הרשומות כך שכל אחת מהן תכיל רק את השדות הדרושים
    calories.forEach((entry) => {
      const formattedEntry = {
        day: entry.day,
        description: entry.description,
        amount: entry.amount,
      };

      switch (entry.category) {
        case "breakfast":
          report.breakfast.push(formattedEntry);
          break;
        case "lunch":
          report.lunch.push(formattedEntry);
          break;
        case "dinner":
          report.dinner.push(formattedEntry);
          break;
        default:
          report.other.push(formattedEntry);
      }
    });

    res.json(report);
  } catch (err) {
    res.status(500).json({ message: "Error generating report", error: err });
  }
});

module.exports = router;
