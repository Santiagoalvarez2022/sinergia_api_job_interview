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
        email:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM('active','inactive'),
            defaultValue: 'inactive',
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
        lastname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
      },

      {paranoid: true}
  ); // habilitar el borrado logico
};