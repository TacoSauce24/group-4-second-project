// Ian
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class comments extends Model {}

comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'required',
                },
            },
        },
        comment_body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'required',
                },
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        animal_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'animals',
                key: 'id'
            }
        },
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tags',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
    }
)

module.exports = comments;