//Ian
const sequelize = require('../config/connection');
const { users, comments, animals, tags} = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const animalData = require('./animalData.json');
const tagData = require('./tagData');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const user = await users.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const animal = await animals.bulkCreate(animalData);

    const tag = await tags.bulkCreate(tagData);

    for (const comment of commentData) {
        await comments.create({
            ...comment,
            user_id: user[Math.floor(Math.random() * user.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();