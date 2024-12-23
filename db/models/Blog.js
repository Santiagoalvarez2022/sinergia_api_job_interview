const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'blog',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            subtitle:{
                type: DataTypes.STRING(255),
                allowNull: false
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },

        }, { paranoid: true }
    )
}