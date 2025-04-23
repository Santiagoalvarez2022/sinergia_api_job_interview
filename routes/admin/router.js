const express = require('express');
const router = express.Router();
const {getSessions} = require('../../services/conversationService.js');
const { logIn, logOut, authCheck } = require('../../controllers/admin/LogInAdmin.js');
const verifyTokenAdmin = require('../../midlewares/verifyTokenAdmin.js');
const {getBlogsAdmin,updateStateBlog } = require('../../controllers/admin/BlogsAdmin.js');

router.get('/sessions',async(req,res)=>{
//get stage
    console.log('entre a admin');
    
    try {
        const result = getSessions()
        res.status(200).json(result)
        
    } catch (error){ res.status(400).json({error})}

    
});

router.post('/login', logIn)
router.post('/logout', logOut)
router.post('/checktoken', authCheck )
router.get('/blogs', verifyTokenAdmin, getBlogsAdmin)
router.put('/blog/:id',verifyTokenAdmin, updateStateBlog)

module.exports = router;

 