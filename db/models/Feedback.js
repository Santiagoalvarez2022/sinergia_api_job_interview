const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
 sequelize.define(
     "feedback",
     
     {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,//si osi tiene que teer un valor 
            primaryKey: true,//
        },
        data: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        stage: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        position: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        
     },

     {paranoid: true}
 ); // habilitar el borrado logico
};