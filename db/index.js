require('dotenv').config();
/*conectarme a la base de datos  */
const fs = require("fs");
const path = require("path");
const { Sequelize } = require('sequelize');
const {USER_PG, PASSWORD_PG, HOST_PG, DATABASE_PG,PORT_PG, URL_DATABASE} = process.env;

// // conexion para localjost
//   const sequelize = new Sequelize(`postgresql://${USER_PG}:${PASSWORD_PG}@${HOST_PG}:${PORT_PG}/${DATABASE_PG}`, {
//       dialect: "postgres",
//       logging: false,
//       native: false,

//    })

const sequelize = new Sequelize(URL_DATABASE,{ logging: false});
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
//realaciones 


const {User,Feedback}  = sequelize.models 
console.log("modelos",sequelize.models);

User.hasMany(Feedback);
Feedback.belongsTo(User);



  sequelize
  .drop() // Elimina todas las tablas
  .then(() => sequelize.sync({ force: true })) // Vuelve a crear las tablas
  .then(() => console.log("Base de datos reiniciada."))
  .catch((error) => console.error("Error:", error));
  



module.exports ={ connectionToDatabase, sequelize, ...sequelize.models};