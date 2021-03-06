const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const BASE_URL = process.env.BASE_URL;
const MailComposer = require('nodemailer/lib/mail-composer');
const mailgun = require('mailgun-js')({ apiKey, domain });
const chalk = require('chalk');

module.exports = {
  sendConfirmationEmail: function confirmationEmail(user) {
    const toEmail = user.email;
    const generateLink = () => (
      '<b>Welcome to Nexcast!</b><br/>Make sure this is the email associated with your podcast so we can verify you as the owner. <br/>Please confirm your account by clicking through this link: ' + `<a href=${BASE_URL}/verify-user-account?t=${user.confirmationToken}>Verify email address</a><br/>Thanks for joining!<br/>The Nexcast Team`
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
  },
  podcastEmailPending: function emailPending(userId, userEmail, podcast) {
    const toEmail = 'vvnsze@gmail.com';
    const generateMessage = () => {
      return 'User: ' + userEmail + '<br/>Wants to claim: ' + podcast.title + '<br/>Email Associated: ' + podcast.email + '<br/>Would you like to approve? ' + `<a href=${BASE_URL}/verify-user-to-podcast?feed=${encodeURIComponent(podcast.feed)}&userId=${userId}&confirm=true&title=${encodeURIComponent(podcast.title)}&email=${encodeURIComponent(userEmail)}>Yes</a> <a href=${BASE_URL}/verify-user-to-podcast?feed=${encodeURIComponent(podcast.feed)}&userId=${userId}&confirm=false>No</a>`;
    };
    const mail = new MailComposer({
      from: 'Nexcast.co <vvnsze@gmail.com>',
      to: toEmail,
      subject: 'Podcast Feed Validation',
      text: generateMessage(),
      html: generateMessage(),
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
  },
  podcastEmailMatched: function emailMatched(userEmail, podcastTitle) {
    const toEmail = userEmail;
    const generateMessage = () => {
      return `Success! We have verified you as the owner of ${podcastTitle} <br/> You can now start tagging content here:<a href=${BASE_URL}/searchpodcast>Start Tagging</a><br/>Thanks,<br/>The Nexcast Team`;
    };
    const mail = new MailComposer({
      from: 'Nexcast.co <vvnsze@gmail.com>',
      to: toEmail,
      subject: 'You have been approved',
      text: generateMessage(),
      html: generateMessage(),
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
  },
};
