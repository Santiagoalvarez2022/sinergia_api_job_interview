const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sendMessageAi = require('../../controllers/sendMessageAi');
const deleteOldAudio = require('../../midlewares/deleteAudio');
const { PassThrough } = require('stream');
const { newConversation } = require('../../controllers/messages/newConversation');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const verifyToken = require('../../midlewares/verifyToken');
const { cleanConversation } = require('../../controllers/messages/cleanConversation');
const verifyTypeMime = require('../../midlewares/verifyTypeMime');


router.post('/newConversation', verifyToken ,upload.single('file'),verifyTypeMime,newConversation );
router.delete('/deleteConversation', verifyToken , cleanConversation );



module.exports = router

