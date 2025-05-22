const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'tag',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(60),
                unique: true,
                allowNull: false
            }
        }, { paranoid: true }
    )
} 