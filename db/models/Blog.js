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
                type: DataTypes.CHAR(60),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT('long'),
                allowNull: false
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, { paranoid: true }
    )
}