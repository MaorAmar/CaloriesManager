const express = require("express");
const User = require("../models/user");
const router = express.Router();

// קריאת פרטי משתמש על פי מזהה
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // מחפש את המשתמש ומסיר את השדה `_id`
    const user = await User.findOne({ id: userId }).select("-_id");
    if (!user) return res.status(404).send("User not found");

    // מעצב את התאריך לפורמט 'YYYY-MM-DD'
    const formattedUser = {
      ...user.toObject(),
      birthday: user.birthday.toISOString().split("T")[0],
    };

    res.json(formattedUser);
  } catch (err) {
    res.status(500).send("Error retrieving user");
  }
});

module.exports = router;
