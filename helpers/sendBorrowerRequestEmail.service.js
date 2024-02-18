const transporter = require('../helpers/emailConfig');
const fs = require('fs');

const sendBorrowerRequestEmail = async (
  lenderEmail,
  lenderName,
  borrowerName,
  itemName
) => {
  const emailSubect = `New Borrowing Request: ${itemName} - Action Required`;

  let emailTemplate;

  const template = fs.readFileSync(
    './emailTemplates/borrowingRequest.html',
    'utf-8'
  );

  emailTemplate = template.replace('{{lenderName}}', lenderName);
  emailTemplate = emailTemplate.replace('{{borrowerName}}', borrowerName);
  emailTemplate = emailTemplate.replace('{{itemName}}', itemName);

  const emailRecipient = lenderEmail;

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

module.exports = sendBorrowerRequestEmail;
