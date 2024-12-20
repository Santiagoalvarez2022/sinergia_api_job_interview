const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'author',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            nickname: {
                type: DataTypes.CHAR(60),
                allowNull: false
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, { paranoid: true }
    )
}