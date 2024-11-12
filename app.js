require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const calorieRoutes = require("./routes/calories");
const aboutRoutes = require("./routes/about"); // ייבוא של הנתיב כראוי
const app = express();

// הגדרת bodyParser
app.use(bodyParser.json());

// התחברות ל-MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// הגדרת מסלולים (Routes)
app.use("/users", userRoutes); // מסלול למשתמשים
app.use("/addcalories", calorieRoutes); // מסלול לצריכת קלוריות
app.use("/about", aboutRoutes); // מסלול המפתחים

// הגדרת תיקיית public לשיתוף קבצים סטטיים (כמו קובץ index.html)
app.use(express.static("public"));

// מסלול ברירת מחדל אם אין התאמה למסלול
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// הגדרת פורט והאזנה לשרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
