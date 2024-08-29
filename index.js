const express = require('express');
const cors = require('cors');
const cookieParser = require( 'cookie-parser');
const AuthService = require( './services/AuthService.js');
const controllers = require('./controllers/index.js');
const CookieService = require( './services/CookieService.js');
const app = express();//CREE UNA INSTANCIA DE EXPRESS, QUIERE DECIR QUE TENFGO ACCESO A TODOS SUS METODOS 
const port = 3001;
const mainRouter = require('./routes/index')
const path = require('path');
const {connectionToDatabase }= require('./db/index.js')
//midlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // Reemplaza con el origen de tu cliente
  credentials: true  // Permite el envío de credenciales como cookies
}));


connectionToDatabase()
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api',mainRouter)

app.listen(port, () => {
  //agregar la conxion ycreacion de las tabblas en la base de datos
    console.log(`Servidor corriendo en http://localhost:${port}`);
   
}); 

