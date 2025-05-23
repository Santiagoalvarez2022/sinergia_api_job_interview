require('dotenv').config();
const {PORT,URL_FRONT,WORK_SPACE, URL_FRONT_ADMIN} = process.env;
const express = require('express'); 
const cors = require('cors');
const cookieParser = require( 'cookie-parser');
const app = express();//CREE UNA INSTANCIA DE EXPRESS, QUIERE DECIR QUE TENFGO ACCESO A TODOS SUS METODOS 
const mainRouter = require('./routes/index')
const {connectionToDatabase }= require('./db/index.js')
const path = require('path');
const fs = require('fs')
const https = require('https') 
  
//midlewares
app.use('/audio', express.static(path.join(__dirname, 'public')));
app.use(express.json());
  
app.use(cors({
  // origin: URL_FRONT,  // Reemplaza con el origen de tu cliente  
  origin:[URL_FRONT , URL_FRONT_ADMIN], 
  optionsSuccessStatus: 200,
  credentials: true,   
}));  

console.log('FRONT PERMITIDO ', URL_FRONT);
console.log('ADMIN PERMITIDO ', URL_FRONT_ADMIN);

   
connectionToDatabase() 
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routing 
app.use('/api',mainRouter)

if (WORK_SPACE==='development') {
  const keyPath = path.resolve('./certs/key.pem');
  const certPath = path.resolve('./certs/cert.pem');

  const key = fs.readFileSync(keyPath);
  const cert = fs.readFileSync(certPath);

  const server = https.createServer({ key, cert }, app);
  server.listen(PORT , () => {
    console.log(`HTTPS Server is running in development on port ${process.env.PORT }`);
  });

} else {

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }); 

}


