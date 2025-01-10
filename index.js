require('dotenv').config();
const {PORT,URL_FRONT} = process.env;
const express = require('express'); 
const cors = require('cors');
const cookieParser = require( 'cookie-parser');
const app = express();//CREE UNA INSTANCIA DE EXPRESS, QUIERE DECIR QUE TENFGO ACCESO A TODOS SUS METODOS 
const mainRouter = require('./routes/index')
const {connectionToDatabase }= require('./db/index.js')
const path = require('path');
 

 
//midlewares
app.use('/audio', express.static(path.join(__dirname, 'public')));
app.use(express.json());
 
app.use(cors({
  // origin: URL_FRONT,  // Reemplaza con el origen de tu cliente 
  origin:['https://sinergia-dev.vercel.app','http://localhost:5555', 'https://d7c7-45-224-103-72.ngrok-free.app'], 
  credentials: true  // Permite el envío de credenciales como cookies
}));  
   
connectionToDatabase() 
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

  
//routing 
app.use('/api',mainRouter)

app.listen(PORT, () => {
  //agregar la conxion ycreacion de las tabblas en la base de datos
console.log(URL_FRONT);
   console.log(PORT);
   
}); 

