const express = require('express');
const router = express.Router();
const {getSessions} = require('../../services/conversationService.js')

router.get('/sessions',async(req,res)=>{
//get stage
    console.log('entre a admin');
    
try {
        const result = getSessions()
        res.status(200).json(result)
        
    } catch (error){ res.status(400).json({error})}

    
});




module.exports = router;

//mantener la conversacion de esa stages
