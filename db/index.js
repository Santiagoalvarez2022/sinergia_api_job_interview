require('dotenv').config();
/*conectarme a la base de datos  */
const fs = require("fs");
const path = require("path");
const { Sequelize } = require('sequelize');
const {USER_PG, PASSWORD_PG, HOST_PG, DATABASE_PG,PORT_PG, URL_DATABASE} = process.env;
const bcrypt = require('bcrypt');

// // conexion para localjost
   const sequelize = new Sequelize(`postgresql://${USER_PG}:${PASSWORD_PG}@${HOST_PG}:${PORT_PG}/${DATABASE_PG}`, {
       dialect: "postgres",
       logging: false,
       native: false,

   })

// const sequelize = new Sequelize(URL_DATABASE,{ logging: false});
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
  .sync({ force: false }) // Vuelve a crear las tablas
  .then(async() => {
    const saltRounds = 10;
    let password = await bcrypt.hash('sinergia', saltRounds);
    let nickname = 'admin'

    const [newUser, created ]= await User.findOrCreate({
      where : {nickname},
      defaults : {
          nickname,
          password,
          name : 'Facundo Santiago'
      }
  })

    
   
    Feedback.create({
      data : 'Hola, soy un modelo de inteligencia artificial diseñado por Sinergia para ayudarte a prepararte para tus entrevistas. De acuerdo con la categoría que elegiste y el puesto proporcionado, aquí está mi primera pregunta:\n\n1. ¿Puedes describir alguna experiencia pasada en la que tuviste que tomar una decisión rápida bajo presión? ¿Qué sucedió y cuál fue el resultado?',
      stage : 'Datos personales',
      position : "ceo"
    })
    const a = await Feedback.create({
      data : '1 Hola, soy un modelo de inteligencia artificial diseñado por Sinergia para ayudarte a prepararte para tus entrevistas. De acuerdo con la categoría que elegiste y el puesto proporcionado, aquí está mi primera pregunta:. ¿Puedes describir alguna experiencia pasada en la que tuviste que tomar una decisión rápida bajo presión? ¿Qué sucedió y cuál fue el resultado?',
      stage : 'Datos personales',
      position : "ceo"
    })
    const b = await Feedback.create({
      data : ' 2 Hola, soy un modelo de inteligencia artificial diseñado por Sinergia para ayudarte a prepararte para tus entrevistas. De acuerdo con la categoría que elegiste y el puesto proporcionado, aquí está mi primera pregunta:. ¿Puedes describir alguna experiencia pasada en la que tuviste que tomar una decisión rápida bajo presión? ¿Qué sucedió y cuál fue el resultado?',
      stage : 'Datos personales',
      position : "ceo"
    })
    const c = await Feedback.create({
      data : '3 Hola, soy un modelo de inteligencia artificial diseñado por Sinergia para ayudarte a prepararte para tus entrevistas. De acuerdo con la categoría que elegiste y el puesto proporcionado, aquí está mi primera pregunta:. ¿Puedes describir alguna experiencia pasada en la que tuviste que tomar una decisión rápida bajo presión? ¿Qué sucedió y cuál fue el resultado?',
      stage : 'Datos personales',
      position : "ceo"
    })

     await a.setUser(newUser)    
     await b.setUser(newUser)
     await c.setUser(newUser)

     
  })
  .catch((error) => console.error("Error:", error));
  



module.exports ={ connectionToDatabase, sequelize, ...sequelize.models};