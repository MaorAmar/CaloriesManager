const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Ensure this is the correct path

// GET /users/:id
router.get("/:id", function (req, res) {
  // Get id parameter from the URL
  const id = parseInt(req.params.id); // Convert to integer
  console.log(id);

  // Find the specific user by id
  User.findOne({ id: id }) // Use findOne instead of find
    .then((user) => {
      // If no user found
      if (!user) {
        return res.status(404).send("No user found."); // Use 404 status
      }

      // Response in JSON format with formatted date
      const { id, first_name, last_name, birthday } = user;
      const formattedBirthday = birthday.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      res
        .status(200)
        .json({ id, first_name, last_name, birthday: formattedBirthday });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Failed to get user data"); // Use 500 for server errors
    });
});

module.exports = router;
