const {User} = require('../../../db/index.js')
const bcrypt = require('bcrypt');

const getUsers = async(req,res) =>{
    try {
        const users = await User.findAll()

        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    getUsers
}