//Ian
const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const commentRoutes = require('./commentRoutes');
const tagRoutes = require('./tagRoutes');
const animalRoutes = require('./animalRoutes');

router.use('/users', userRoutes);
router.use('/commentRoutes', commentRoutes);
router.use('/tagRoutes', tagRoutes);
router.use('/animalRoutes', animalRoutes);

module.exports = router;