/**
 * Mailer config
 * Created by tphuocthai.
 */
const nconf = require('nconf');

module.exports = {

  /**
   * Configuration for mail transport
   * For more information see: https://github.com/andris9/nodemailer-smtp-transport#usage
   */
  transport: nconf.get('mailer:transport') || {
    host: 'smtp.server.name',
    port: 587,
    secure: true,
    auth: {
      user: 'smtp.username',
      pass: 'smtp.password'
    }
  },

  /**
   * Default options on sending email, this is default values for email message fields
   * For more information see: http://www.nodemailer.com/#e-mail-message-fields
   */
  mailOptions: {
    from: nconf.get('mailer:from') || 'Admin <admin@tarabalam.com>'
  },

  /**
   * Default template data
   */
  templateData: {
    pretty: false
  }
};

