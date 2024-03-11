// jozsua
const animals = require('./animals');
const comments = require('./comments');
const tags = require('./tags');
const users = require('./users');


animals.hasMany(comments, {
    foreignKey: 'animal_id',
    onDelete: 'CASCADE'
});

comments.belongsTo(animals, {
    foreignKey: 'animal_id'
})

users.hasMany(comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    
});

comments.belongsTo(users, {
    foreignKey: 'user_id'
})

// tags.belongsToMany(comments, {
    // through: {
    //     model: animals,
    //     unique: false
    // },
    // as: 'comments_tags'
// });


// comments.belongsToMany(tags, {
    // through: {
    //     model: animals,
    //     unique: false
    // },
    // as: 'tags_comments'
// });


module.exports = { animals, comments, tags, users};