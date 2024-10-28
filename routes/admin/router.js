const express = require('express');
const {getSessions} = require('../../services/conversationService.js');
const { getUsers } = require('../../controllers/admin/getUsers.js');
const router = express.Router();


/*

todos los metodos necesitan una path unico(/session)


router.metodo(path, controller)

router.get ==> enviar info al usuario 
router.post ==> envie info y evventualente hagas algo en el back con eso
router.delete === > borrar algo 
router.update ==> actualizar algo 

*/


//router.metodo = get     (path==='/session, controller = getSession() )
router.get('/sessions',async(req,res)=>{
//get stage
    console.log('entre a admin');
    
try {
        const result = getSessions()
        res.status(200).json(result)
        
    } catch (error){ res.status(400).json({error})}

    
});


// obtener todos los usuarios
//metodo get 
//ruta ('/users)
//controller = getUsers() 
// routaDeApi/api/admin/users tiene una funion que me devuelve todos los usuarios de mi base de datos.



router.get('/users',  async(req,res)=>{
    console.log("entre a users");
    
    // necesito tener un controlador que me traiga todos los usuarios de mi base de datos 
    try {
            const result = await getUsers(); // {}
            console.log('=====> result de getUsers', result);
            
            res.status(200).json(result);
            
        } catch (error){ res.status(400).json({error})}
    
        
    })




module.exports = router;

//mantener la conversacion de esa stages
