const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const hostName = process.env.HOST_NAME;
const MailComposer = require('nodemailer/lib/mail-composer');
const mailgun = require('mailgun-js')({ apiKey, domain });

module.exports = function sendConfirmationEmail(user) {
  const toEmail = user.email;
  const generateLink = () => (
    `<a href=${hostName}/verify-user-account?t=${user.confirmationToken}>Verify email address</a>`
  );

  const mail = new MailComposer({
    from: 'Nexcast.co <vvnsze@gmail.com>',
    to: toEmail,
    subject: 'Welcome To Nexcast',
    text: generateLink(),
    html: generateLink(),
  });

  mail.compile().build((mailBuildError, message) => {
    const dataToSend = {
      to: toEmail,
      message: message.toString('ascii'),
    };
    mailgun.messages().sendMime(dataToSend, (sendError, body) => {
      if (sendError) {
        return sendError;
      }
      return body;
    });
  });
};
