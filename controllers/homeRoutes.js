const express = require("express");
const router = express.Router();
const { users } = require("../models");
const withAuth = require("../utils/auth");

// Handle GET request for the main homepage
router.get("/", async (req, res) => {
  try {
    // Render the homepage.handlebars template with necessary data
    res.render("homepage", {
      pageTitle: "Animals Seen Blog",
      animalImageUrl: "images/animals.jpg",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle GET request for the login page
router.get("/login", async (req, res) => {
  try {
    // Fetch user-specific data if needed
    const user = await users.findByPk(req.session.userId);

    // Render the login-signup.handlebars template with necessary data
    res.render("login-signup", {
      pageTitle: "Log In or Sign Up",
      animalImageUrl: "images/animals.jpg",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle GET request for the signup page
router.get("/signup", async (req, res) => {
  try {
    // Fetch user-specific data if needed
    const user = await users.findByPk(req.session.userId);

    // Render the login-signup.handlebars template with necessary data
    res.render("login-signup", {
      pageTitle: "Log In or Sign Up",
      animalImageUrl: "images/animals.jpg",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  res.render("login-signup");
});

// Handle GET request for the dashboard page
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Fetch user-specific data to render on the dashboard
    const user = await users.findByPk(req.session.userId);

    if (user) {
      // Render the dashboard.handlebars template with personalized content
      res.render("dashboard", {
        pageTitle: `Welcome, ${user.username}!`,
      });
    } else {
      // Handle case where the user data is not found
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
