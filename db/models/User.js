 const {DataTypes} = require("sequelize");

 module.exports = (sequelize) => {
  sequelize.define(
      "user",
      
      {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,//si osi tiene que teer un valor 
            primaryKey: true,//
        },
        nickname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
      
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
      },

      {paranoid: true}
  ); // habilitar el borrado logico
};