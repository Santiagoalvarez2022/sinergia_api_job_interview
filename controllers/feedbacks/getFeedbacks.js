const {Feedback, User} = require('../../db/index')

const getFeedback = async(clientId=null) => {
    console.log('client id ', clientId);
    
    try {
        if (clientId) {
            const userWithFeedbacks = await User.findOne({
                where: { id: clientId },
                include: Feedback // Incluye los Feedbacks relacionados
            });
            

            const result = userWithFeedbacks.feedbacks.map(feedback=> {
                const {id,data,stage,position,createdAt} = feedback.dataValues
                let date = new Date(createdAt);
                date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

                return {
                    id,
                    data,
                    stage,
                    position,
                    date,
                    userId : clientId
                }
            });
            

            if (!userWithFeedbacks) {
                console.log('Usuario no encontrado');
                return null;
            }

            
            return result; // Retorna los feedbacks del usuario
        }

        console.log('entre aqui ');
        
        return usersWithFeedbacks = await User.findAll({
            include: Feedback // Incluye los Feedbacks relacionados para cada usuario
        });

        
    } catch (error) {
        console.error('Error al obtener los feedbacks del usuario:', error);
    }
};

module.exports = {
    getFeedback
}