const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('config');
const hooks = require('./mailer.hooks');

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
};
