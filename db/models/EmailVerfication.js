 const {DataTypes} = require("sequelize");

 module.exports = (sequelize) => {
  sequelize.define(
      "EmailVerification",
      {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false, 
            primaryKey: true,
        },
        token:{
            type : DataTypes.CHAR(255),
            allowNull: false,
        }, 
        used : {
            type : DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
      },

      {paranoid: true}
  ); // habilitar el borrado logico
};