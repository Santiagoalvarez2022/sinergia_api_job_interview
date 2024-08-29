const express = require('express');
const router = express.Router();



//selecion de stages
/*
    el promp debe : 
    - parametrizar la conversacion
    - generar las preguntas y esperar las respuestas
    
    //en
*/

//axios.post(http://localhost:3001/api/interview, data )

router.post('/',async(req,res)=>{
//get stage
    try {
        const {stage} = req.query;
        console.log(stage);

        //selected prompt iniciar conversacion 
        res.status(200).json(stage)
        
    } catch (error){ res.status(400).json({error})}

    
});




module.exports = router;

//mantener la conversacion de esa stages
