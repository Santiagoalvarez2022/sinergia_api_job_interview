const express = require('express');
const router = express.Router();


router.post('/',async(req,res)=>{
//get stage
    try {
        const {stage} = req.query;
        console.log(stage, "categoria seleccionada");
        //selected prompt iniciar conversacion 
        

        res.status(200).json(stage)
        
    } catch (error){ res.status(400).json({error})}

    
});




module.exports = router;

//mantener la conversacion de esa stages
