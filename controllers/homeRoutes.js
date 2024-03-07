// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Middleware to check if the user is authenticated
const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    // If the user is not authenticated, redirect them to the login page
    res.redirect('/login');
  } else {
    next();
  }
<<<<<<< HEAD
};

// Handle GET request for the main page
router.get('/', async (req, res) => {
  // Render the main.handlebars template with necessary data
  res.render('main', {
    pageTitle: 'Awesome Animals',
    imageUrl: 'path/to/your/animals-image.jpg',
  });
});

// Handle GET request for the user homepage
router.get('/homepage', withAuth, async (req, res) => {
  try {
    // Fetch user-specific data to render on the homepage
    const user = await User.findByPk(req.session.userId);

    if (user) {
      // Render the homepage.handlebars template with personalized content
      res.render('homepage', {
        pageTitle: 'Awesome Animals I Have Seen',
        animalImageUrl: 'path/to/animal/image.jpg',
        animalGeneratedInfo: 'Generated information about the animal',
        animalWikipediaLink: 'https://en.wikipedia.org/wiki/Animal',
      });
    } else {
      // Handle case where the user data is not found
      res.status(404).json({ error: 'User not found' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
=======
});

module.exports = router;
>>>>>>> 2a7df3d2b5d9cc48e091dd3b0d4976a76c07bad3
