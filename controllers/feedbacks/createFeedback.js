const {Feedback, User} = require('../../db/index')

const JoinFeedbackToUser = async (text, job, stage, idUser ) => {
    try {

        console.log('entre a crear feedbacks', text, job, stage, idUser);
        
        const newFeedback = await Feedback.create({ 
            data : text,
            stage,
            position : job,
         });
        
        const user = await User.findByPk(idUser)
       
        await newFeedback.setUser(user);

        return { newFeedback, user };
    } catch (error) {
        throw new Error(error.message);
    }
    
};

module.exports = {
    JoinFeedbackToUser
}