const transporter = require('../helpers/emailConfig');
const fs = require('fs');

const sendDueDateApproachingEmail = async (
  borrowerEmail,
  borrowerName,
  itemName
) => {
  const emailSubect = `Reminder: Due Date Approaching for ${itemName} Borrowed Item`;

  let emailTemplate;

  const template = fs.readFileSync(
    './emailTemplates/dueDateApproaching.html',
    'utf-8'
  );

  emailTemplate = template.replace('{{borrowerName}}', borrowerName);
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

module.exports = sendDueDateApproachingEmail;
