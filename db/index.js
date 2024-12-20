require('dotenv').config();
/*conectarme a la base de datos  */
const fs = require("fs");
const path = require("path");
const { Sequelize } = require('sequelize');
const { USER_PG, PASSWORD_PG, HOST_PG, DATABASE_PG, PORT_PG, URL_DATABASE, WORK_SPACE } = process.env;
const bcrypt = require('bcrypt');
const { createAuthorAdmin } = require('./seeds/seed');
const { seeds } = require('./seeds/seed.js');


const sequelize =
  WORK_SPACE == 'development'
    ? new Sequelize(
      {
        username: USER_PG,
        host: HOST_PG,
        port: PORT_PG,
        password: PASSWORD_PG,
        database: DATABASE_PG,
        dialect: 'postgres',
        logging: false
      })
    : new Sequelize(URL_DATABASE, { logging: false });

const modelDefiners = [];
const basename = path.basename(__filename);



/* agregamos cada uno de los archivos a un array "modelDefiners" */
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });
/* le pasamos por params a cada uno de los modelos definidos en la carpeta models "sequelize" */

/* le pasamos por params a cada uno de los modelos definidos en la carpeta models "sequelize" */

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);


const connectionToDatabase = async () => {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
 

sequelize.models = Object.fromEntries(capsEntries);
//realaciones 


const { User, Feedback, Blog, Author, Tag } = sequelize.models
console.log("modelos", sequelize.models);-

/* user -> feedback */
User.hasMany(Feedback);
Feedback.belongsTo(User);

/* blogs -> author && blog -> tag */
Blog.belongsToMany(Tag, { through: 'blogs_tags', onDelete: 'CASCADE' });
Tag.belongsToMany(Blog, { through: 'blogs_tags', onDelete: 'CASCADE' });

Author.hasMany(Blog, { onDelete: 'CASCADE' });
Blog.belongsTo(Author, { onDelete: 'CASCADE' })


sequelize 
  .sync({ force:true, alter: true }) // Vuelve a crear las tablas
  .then(async () => {
    await seeds(Author,Blog,Tag)


  })
  .catch((error) => console.error("Error:", error));




module.exports = { connectionToDatabase, sequelize, ...sequelize.models };