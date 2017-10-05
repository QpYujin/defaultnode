/**
 * EmailService
 * Created by tphuocthai.
 */
const nodemailer = require('nodemailer');
const pug = require('pug');
const moment = require('moment');
const nconf = require('nconf');

let EmailService = module.exports = {};

EmailService.sendVerifyEmail = (token, user, cb) => {

    let mailOpts = {
      to: `${user.fullName} <${user.email}>`,
      subject: `Account confirmation`
    };

    EmailService.sendMail(`views/email-template/verify-email.pug`, {
      user: user,
      token: token,
      baseUrl: nconf.get('baseUrl')
    }, mailOpts, cb);
};

EmailService.sendForgotPassword = (token, user, cb) => {

    let mailOpts = {
      to: `${user.fullName} <${user.email}>`,
      subject: `Tarabalam: forgot password`
    };

    EmailService.sendMail(`views/email-template/forgot-password.pug`, {
      user: user,
      token: token,
      baseUrl: nconf.get('baseUrl')
    }, mailOpts, cb);
};

/**
 * Send notify email
 */
EmailService.sendNotifyEmail = (message, cb) => {
  let notifyEmail = nconf.get('notify_email');

  let mailOpts = {
    to: notifyEmail,
    subject: 'Message posted',
    html: message.content || 'No content'
  };
  mailOpts = _.defaults(mailOpts, server.config.mailer.mailOptions);

  let transporter = nodemailer.createTransport(server.config.mailer.transport);
  transporter.sendMail(mailOpts, cb);
};

/**
 * The options object should match this guide: http://www.nodemailer.com/#e-mail-message-fields
 */
EmailService.sendMail = (templateName, templateData, options, cb) => {
  // Prepare mail options
  let mailOptions = _.pick(options, [
    'to',
    'cc',
    'bcc',
    'replyTo',
    'inReplyTo',
    'references',
    'subject',
    'headers',
    'attachments',
    'alternatives',
    'envelope',
    'messageId',
    'date',
    'encoding'
  ]);
  mailOptions = _.defaults(mailOptions, server.config.mailer.mailOptions);

  let pugOptions = _.defaults(templateData || {}, server.config.mailer.templateData);

  pug.renderFile(templateName, pugOptions, function(err, html) {
    if (err) {
      server.log.error('pug render error', err);
      return cb(err);
    }
    mailOptions.html = html;

    // Do send mail
    let transporter = nodemailer.createTransport(server.config.mailer.transport);
    transporter.sendMail(mailOptions, cb);
  });
};
