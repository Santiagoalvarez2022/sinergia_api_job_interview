const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BlogsTags = sequelize.define(
        'blogs_tags', // Este es el nombre del modelo dentro de sequelize.models
        {
            blogId: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            tagId: {
                type: DataTypes.UUID,
                primaryKey: true
            }
        }, { 
            paranoid: true,
            timestamps: false,
            tableName: 'blogs_tags' // nombre real de la tabla en la base de datos
        }
    );

    return BlogsTags; // 🔑 devolvés el modelo para poder usarlo
};
