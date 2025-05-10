const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth :{
        user : process.env.GMAIL_USER,
        pass : process.env.GMAIL_APP_PASSWORD
    }
});

// Función para enviar un correo de bienvenida
async function sendWelcomeEmail(to, name, token) {
    console.log('envio de email', 
        process.env.GMAIL_USER,
        process.env.GMAIL_APP_PASSWORD
    );
    
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER, // Remitente
        to: to,                       // Destinatario
        subject: `¡Bienvenido/a ${name} a SinergIA! Confirma tu correo y comienza a colaborar.`,
        html: `
<div style="font-family: sans-serif;">
      <h2 style="color: #333;">¡Bienvenido/a a SinergIA!</h2>
      <p style="font-size: 16px; line-height: 1.5;">Hola ${name},</p>
      <p style="font-size: 16px; line-height: 1.5;">¡Estamos felices de darte la bienvenida a SinergIA, tu nuevo espacio para el aprendizaje y la innovación!</p>
      <p style="font-size: 16px; line-height: 1.5;">Gracias por unirte a nuestra comunidad. En SinergIA, podrás conectar con otros profesionales, compartir ideas y potenciar tus habilidades de una manera sinérgica.</p>
      <p style="font-size: 16px; line-height: 1.5;">Para activar tu cuenta y comenzar a disfrutar de todas las funcionalidades de SinergIA, por favor, haz clic en el siguiente botón para confirmar tu dirección de correo electrónico:</p>
      <div style="margin: 20px 0; text-align: center;">
        <a href="${process.env.URL_FRONT}/validate?t=${token}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirmar mi correo electrónico</a>
      </div>
      <p style="font-size: 16px; line-height: 1.5;">Una vez que hayas confirmado tu correo, serás redirigido a la página de inicio de sesión para que puedas acceder a tu cuenta:</p>
     
      <p style="font-size: 14px; line-height: 1.5; color: #777;">Si no has solicitado registrarte en SinergIA, por favor, ignora este correo.</p>
      <p style="font-size: 16px; line-height: 1.5;">¡Estamos ansiosos por verte en SinergIA!</p>
      <p style="font-size: 16px; line-height: 1.5;">Saludos cordiales,</p>
      <p style="font-size: 16px; line-height: 1.5;">El equipo de SinergIA</p>
    </div>      
        `
      });

      console.log('Correo de bienvenida enviado a:', to);
    } catch (error) {
      console.error('Error al enviar el correo de bienvenida:', error);
      throw error; // Re-lanza el error para que el controlador pueda manejarlo
    }
}



module.exports = {
    sendWelcomeEmail,
    // Exporta otras funciones de envío aquí
};