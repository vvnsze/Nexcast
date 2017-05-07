const apiKey = 'key-62e8d3172f916134ea9b42bc938309ad';
const domain = 'sandbox4013da47551941d09a392674d9bc31b0.mailgun.org';
const MailComposer = require('nodemailer/lib/mail-composer');
const mailgun = require('mailgun-js')({ apiKey, domain });

module.exports = function verifyUser() {
  const mail = new MailComposer({
    from: 'Nexcast.co <vvnsze@gmail.com>',
    to: 'vvnsze@gmail.com',
    subject: 'Welcome To Nexcast',
    text: 'Please click the link to confirm',
    html: '<b>Test email text</b>',
  });

  mail.compile().build((mailBuildError, message) => {
    const dataToSend = {
      to: 'vvnsze@gmail.com',
      message: message.toString('ascii'),
    };
    mailgun.messages().sendMime(dataToSend, (sendError, body) => {
      if (sendError) {
        console.log(sendError);
      }
    });
  });
};
