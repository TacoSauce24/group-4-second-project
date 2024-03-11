//Ian
const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const commentRoutes = require('./commentRoutes');
const tagRoutes = require('./tagRoutes');
const animalRoutes = require('./animalRoutes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/tags', tagRoutes);
router.use('/animals', animalRoutes);

module.exports = router;