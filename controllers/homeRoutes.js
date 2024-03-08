// routes/homeRoutes.js
const express = require('express');
const router = express.Router();
const { users } = require('../models');
const withAuth = require('../utils/auth');


// // Middleware to check if the user is authenticated
// const withAuth = (req, res, next) => {
//   if (!req.session.userId) {
//     // If the user is not authenticated, redirect them to the login page
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

// Handle GET request for the main page
router.get('/', async (req, res) => {
  try {
    // Fetch user-specific data if needed
    const user = await users.findByPk(req.session.userId);

    // Render the main.handlebars template with the specified layout
    res.render('homepage', {
      pageTitle: 'Animals Seen Blog',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle GET request for the user homepage
router.get('/homepage', withAuth, async (req, res) => {
  try {
    // Fetch user-specific data to render on the homepage
    const user = await users.findByPk(req.session.userId);

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

router.get('/login', (req, res)=> {
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login-signup');
});

module.exports = router;

