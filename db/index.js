require('dotenv').config();
/*conectarme a la base de datos  */
const fs = require("fs");
const path = require("path");
const { Sequelize } = require('sequelize');
const {USER_PG, PASSWORD_PG, HOST_PG, DATABASE_PG,PORT_PG} = process.env;



const sequelize = new Sequelize(`postgresql://${USER_PG}:${PASSWORD_PG}@${HOST_PG}:${PORT_PG}/${DATABASE_PG}`, {
    dialect: "postgres",
    logging: false,
    native: false,
  
  })



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


const connectionToDatabase = async() =>{   
    
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}


sequelize.models = Object.fromEntries(capsEntries);


sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("tablas creadas");
  })

  



module.exports ={ connectionToDatabase, sequelize, ...sequelize.models};