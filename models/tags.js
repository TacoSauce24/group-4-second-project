// jozsua
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class tags extends Model {}

tags.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncremant: true,
        },
        tags_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underScored: true,
        modelName: 'tags'
    },
);

module.exports = animals;