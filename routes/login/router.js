const express = require('express');
const { createUser} = require('../../controllers/logIn/createUser');
const {requestResetPassword, updatePassword} = require('../../controllers/logIn/requestResetPassword.js')
const validateUser = require('../../controllers/logIn/validateUser.js');
const logIn = require('../../controllers/logIn/loginUser.js')
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/createuser', createUser);
router.post('/validateuser', validateUser);
router.post('/login', logIn);
router.post('/requestpassword', requestResetPassword);
router.patch('/newpassword', updatePassword)
module.exports = router;



