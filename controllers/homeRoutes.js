const router = require('express').Router();
const { Users, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all users and JOIN with user data
    const usersData = await Users.findAll({
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const users = usersData.map((users) => users.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      users, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});