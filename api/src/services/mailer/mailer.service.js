const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const config = require('config');
const hooks = require('./mailer.hooks');
const logger = require('../../logger');

module.exports = function (app) {
  if(config.has('smtp')) {
    app.use(
      '/mailer',
      Mailer(
        smtpTransport({
          host: config.get('smtp.host'),
          secure: false,
          auth: {
            user: config.get('smtp.user'),
            pass: config.get('smtp.pass'),
          },
        },
        { from: config.get('smtp.user') })
      )
    );
    const service = app.service('mailer');
    service.hooks(hooks);
  }
  else if(process.env.NODE_ENV === 'development'){
    logger.log('warn', 'Mock Mailing Enabled');
    nodemailer.createTestAccount((err, account) => {
      app.use(
        '/mailer',
        Mailer(
          smtpTransport({
            host: account.smtp.host,
            secure: account.smtp.secure,
            port: account.smtp.port,
            auth: {
              user: account.user,
              pass: account.pass,
            },
          },
          { from: account.user })
        )
      );
      const service = app.service('mailer');
      service.hooks(hooks);
    });
  }
  
};
