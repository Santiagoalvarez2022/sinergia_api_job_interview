const {User} = require('../../db/index.js')

const createUser = async (user) =>{
    try {
        const {name, lastname, email} = user;
        const [newUser, created ]= await User.findOrCreate({
            where : {email},
            defaults : {
                name,
                lastname,
                email
            }
        })


        return {newUser, created}


    } catch (error) {
        throw Error('Error in creation of User')
    }    

}




module.exports = {
    createUser,

}