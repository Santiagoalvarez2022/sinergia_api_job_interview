const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth :{
        user : process.env.GMAIL_USER,
        pass : process.env.GMAIL_APP_PASSWORD
    }
});

// Función para enviar un correo de bienvenida
async function sendWelcomeEmail(to, name) {
   
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

// Función para enviar un correo de bienvenida
async function sendRequestPassword(to, nickname, token) {
   
    try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: to,
          subject: `Tu contraseña en SinergIA fue actualizada con éxito`,
          html: `
            <div style="font-family: sans-serif;">
              <h2 style="color: #333;">¿Necesitás restablecer tu contraseña?</h2>
              <p style="font-size: 16px; line-height: 1.5;">Hola ${nickname},</p>
              <p style="font-size: 16px; line-height: 1.5;">Recibimos una solicitud para restablecer tu contraseña de SinergIA.</p>
              <p style="font-size: 16px; line-height: 1.5;">Para continuar con el proceso, simplemente hacé clic en el botón a continuación:</p>
              <div style="margin: 20px 0; text-align: center;">
                <a href="${process.env.URL_FRONT}/reset-password?t=${token}&&user=${nickname}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Restablecer contraseña</a>
              </div>
              <p style="font-size: 16px; line-height: 1.5;">Si no solicitaste cambiar tu contraseña, podés ignorar este correo. Tu información está segura.</p>
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
};
// Función para enviar un correo de bienvenida
async function successUpdatePassword(to, nickname) {
   
    try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: to,
          subject: `Tu contraseña en SinergIA fue actualizada con éxito`,
          html: `
            <div style="font-family: sans-serif;">
              <h2 style="color: #333;">Cambio de contraseña exitoso</h2>
              <p style="font-size: 16px; line-height: 1.5;">Hola ${nickname},</p>
              <p style="font-size: 16px; line-height: 1.5;">Te confirmamos que tu contraseña en SinergIA fue actualizada correctamente.</p>
              <p style="font-size: 16px; line-height: 1.5;">Si realizaste este cambio, no necesitás hacer nada más.</p>
              <p style="font-size: 16px; line-height: 1.5;">Si no fuiste vos quien solicitó este cambio, por favor contactanos de inmediato para proteger tu cuenta.</p>
              <p style="font-size: 16px; line-height: 1.5;">Gracias por ser parte de SinergIA.</p>
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
    sendRequestPassword,
    successUpdatePassword
};