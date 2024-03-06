// jozsua
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class animals extends Model {}

animals.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        animal_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underScored: true,
        modelName: 'animals'
    },
);

module.exports = animals;