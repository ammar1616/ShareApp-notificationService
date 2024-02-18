const transporter = require('../helpers/emailConfig');
const fs = require('fs');

const sendDamageClaimEmail = async (
  borrowerEmail,
  borrowerName,
  lenderName,
  itemName
) => {
  const emailSubect = `Urgent - Damage Claim for ${itemName} Reported`;

  let emailTemplate;

  const template = fs.readFileSync(
    './emailTemplates/damageClaim.html',
    'utf-8'
  );

  emailTemplate = template.replace('{{borrowerName}}', borrowerName);
  emailTemplate = emailTemplate.replace('{{lenderName}}', lenderName);
  emailTemplate = emailTemplate.replace('{{itemName}}', itemName);

  const emailRecipient = borrowerEmail;

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

module.exports = sendDamageClaimEmail;
