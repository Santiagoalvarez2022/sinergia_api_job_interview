const {Admin} = require('../../db/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


// Function to handle login logic
const logIn = async(req,res) =>{
    try {
        const {username, password} = req.body;

        // Check if required credentials are provided
        if (!username || !password) throw Error('Incomplete information to logIn');

        // Search for the admin in the database by username
        const findAdmin = await Admin.findOne({
            where  : {username}
        })

        // If the admin doesn't exist, return an error
        if (!findAdmin) throw Error('User not found');

        // Compare the given password with the hashed password in the database
        const isCorrect =  await bcrypt.compare(password, findAdmin.password);
        if (!isCorrect) {
            throw Error('incorrect password ')
        }

        // If password is correct, create a JWT token with the admin ID
        const token = jwt.sign(
            {id:findAdmin.id,},
            process.env.JWT_SECRET_ADMIN,
            {expiresIn: '8h'} // Token will expire in 8 hours
        )

        // Send the token in an HTTP-only cookie (secure, not accessible via JavaScript)
        res.cookie('t_a', token, {
            httpOnly: true,       // Prevents client-side JS from accessing the cookie
            secure: true,         // Ensures cookie is sent only over HTTPS
            sameSite: 'None',     // Allows cross-site cookie for frontend on different origin
            maxAge: 8 * 60 * 60 * 1000 // Cookie lifetime: 8 hours
        });
        
        // Respond with success message
        res.status(200).json({msg:'successful login'})

    } catch (error) {
        // Log the error for debugging
        console.error("Error loggin admin", error.message);

        res.status(400).json({ 
            status: 400,
            message: error.message 
        });
    }
}

// Function to handle logout logic
const logOut = async(req,res) =>{
    try {
        // Clear the authentication cookie from the client
        res.clearCookie('t_a', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });

        // Respond with logout success message
        res.status(200).json({ message: 'successful logout' });

    } catch (error) {
        // Log the error for debugging
        console.error("Error in log out", error.message);

        res.status(400).json({ 
            status: 400,
            message: error.message 
        });
    }
}

const authCheck = async(req, res) => {
  const token = req.cookies.t_a;
 
  
  if (!token) return res.status(401).json({ authorized: false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    const findAdmin = await Admin.findByPk(decoded.id)
    if (!findAdmin) {
        throw Error('token invalid')
    }
    res.status(200).json({ authorized: true});
  } catch (err) {
    res.status(401).json(err);
  }


};

// Export both login and logout functions
module.exports = {
    logIn,
    logOut,
    authCheck
}
