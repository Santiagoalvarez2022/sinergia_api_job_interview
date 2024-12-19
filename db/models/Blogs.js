const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
 sequelize.define(
     "blog",
     {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,//si osi tiene que teer un valor 
            primaryKey: true,//
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        img: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING), 
            allowNull: true
        },
        reference: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        
     },
     {paranoid: true}
 ); // habilitar el borrado logico
};