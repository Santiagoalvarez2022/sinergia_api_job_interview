const express = require('express');
const router = express.Router();
const verifyToken = require('../../midlewares/verifyToken');
const { getFeedback } = require('../../controllers/feedbacks/getFeedbacks');

router.get('/', verifyToken , async(req,res)=>{
    const clientId = req.user.id
    console.log('entrar a obtener los feedbacks     ', clientId);
    try {
        const response = await getFeedback(clientId)
        res.status(200).json({response})
    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router;