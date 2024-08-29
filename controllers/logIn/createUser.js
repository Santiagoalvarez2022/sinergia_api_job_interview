const {User} = require('../../db/index.js')

const createUser = async (user) =>{
    try {
        const {name, lastname, email} = user;
        const [newUser, created ]= await User.findOrCreate({
            where : {email},
            defaults : {
                name,
                lastname
            }
        })
        console.log("conrtroller para crear usuarios ", newUser, created);
        return {newUser, created}
    } catch (error) {
        
    }    

}



/*await User.findOrCreate({
  where: { username: 'sdepold' },
  defaults: {
    job: 'Technical Lead JavaScript',
  },
}); */


module.exports = {
    createUser,

}