const transporter = require('../helpers/emailConfig');
const fs = require('fs');

const sendResetPasswordEmail = async (user, generatedPassword) => {
  const emailSubect = 'Security Alert: Your Account Password Has Changed';

  let emailTemplate;

  const template = fs.readFileSync(
    './emailTemplates/resetPassword.html',
    'utf-8'
  );

  emailTemplate = template.replace(
    '{{userName}}',
    user.username == null || user.username == '' ? user.email : user.username
  );
  emailTemplate = emailTemplate.replace(
    '{{generatedPassword}}',
    generatedPassword
  );

  const emailRecipient = user.email;

  const mailOptions = {
    to: [emailRecipient],
    subject: emailSubect,
    html: emailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification sent successfully!');
    return { status: true, message: 'Notification sent successfully!' };
  } catch (error) {
    console.error('Error occurred while sending the email:', error);
    return { status: false, error: error };
  }
};

module.exports = sendResetPasswordEmail;
