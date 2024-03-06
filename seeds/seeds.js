//Ian
const sequelize = require('../config/connections');
const { User, comments, animals, tags} = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const animalData = require('./animalData.json');
const tagData = require('./tagData');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const animal = await animals.bulkCreate(animalData);

    const tag = await tags.bulkCreate(tagData);

    for (const comment of commentData) {
        await comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();