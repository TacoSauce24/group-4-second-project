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
            autoIncrement: true,
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

module.exports = tags;