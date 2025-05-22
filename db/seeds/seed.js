const {arrayBlog,addAuthors} = require('./blogsArray')
const bcrypt = require('bcrypt');

const seeds = async(Admin, Tag) =>{
    console.log('Start creating seeds');
   const tags = [
    'Búsqueda de empleo',
    'Para reclutadores',
    'Preparación para entrevista',
  ];

  // 1. Verificamos qué tags ya existen en la base de datos
  const existingTags = await Tag.findAll({
    where: {
      name: tags,
    },
    attributes: ['name'],
  });

  // 2. Creamos un Set con los nombres existentes
  const existingNames = new Set(existingTags.map(tag => tag.name));

  // 3. Filtramos los que aún no están en la base
  const tagsToCreate = tags
    .filter(name => !existingNames.has(name))
    .map(name => ({ name })); // Convertimos a objetos para bulkCreate

  // 4. Si hay tags nuevos, los insertamos
  if (tagsToCreate.length > 0) {
    await Tag.bulkCreate(tagsToCreate);
    console.log(`Se crearon ${tagsToCreate.length} tags esenciales.`);
  } else {
    console.log('Todos los tags esenciales ya existen. No se creó nada.');
  }
}


module.exports = {
    seeds
}

