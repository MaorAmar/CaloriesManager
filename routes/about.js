const express = require("express");
const router = express.Router();

// החזרת פרטי המפתחים
router.get("/", (req, res) => {
  const developers = [
    {
      name: "Maor Amar",
      role: "Developer",
      email: "maoramar2641@gmail.com",
      createdAt: "2024-11-11",
    },
    {
      name: "Or Yehudian",
      role: "Developer",
      email: "Or89751@gmail.com",
      createdAt: "2024-11-11",
    },
  ];

  res.json(developers);
});

module.exports = router;
