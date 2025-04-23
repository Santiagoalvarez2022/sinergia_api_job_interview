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
            //agregar subtitle y text 
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique:true 
            }, 
            
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            author: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            approved : {
                type: DataTypes.ENUM('pending', 'approved'),
                allowNull: false, // opcional, según tu lógica
                defaultValue: 'pending' // opcional
            },
            design_type: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, { paranoid: true }
    )
}