const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'admin',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            username: {
                type: DataTypes.CHAR(60),
                allowNull: false,
                unique:true
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        }, { paranoid: true }
    )
} 