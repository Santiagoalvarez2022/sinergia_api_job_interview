const { User} = require('../../db/index')


const UserExist  = async (id) =>{
    const user = await User.findByPk(id)

    if (!user) throw Error('User does exist')
    console.log('usuario con id  ', id , 'Existe en la base de dato');
    return true
}

module.exports = {
    UserExist
}