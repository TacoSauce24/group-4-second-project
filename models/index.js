// jozsua
const animals = require('./animals');
const comments = require('./comments');
const tags = require('./tags');
const users = require('./users');


animals.hasMany(comments, {
    foreignKey: 'animals_id',
    onDelete: 'CASCADE'
});

users.hasMany(comments, {
    foreignKey: 'users_id',
    onDelete: 'CASCADE',
    
});

tags.belongsToMany(comments, {
    through: {
        model: animals,
        unique: false
    },
    as: 'comments_tags'
});

module.exports = { animals, comments, tags, users};