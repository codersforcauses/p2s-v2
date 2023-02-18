/* eslint-disable indent */
const errors = require('@feathersjs/errors');
const config = require('config');

module.exports = (app) => {
  const getLink = (type, queryType, hash) => `${config.get('client')}/${type}?${queryType}=${hash}`;

  const sendEmail = (email) => {
    return app
      .service('mailer')
      .create(email)
      .then((result) => {
        console.log('Sent email', email, result);
      })
      .catch(err => {
        console.log('Error sending email', err);
      });
  };

  const getEmail = (user, subjectData, htmlData) => ({
    from: 'webapp@p2srugbyworks.com',
    to: user.email,
    subject: subjectData,
    html: htmlData,
  });

  const getEmailAndToken = (email, token) => `${Buffer.from(email).toString('base64url')}___${token}`

  return {
    notifier: (type, user) => {
      try {
        let tokenLink;
        let email;
        switch (type) {
          case 'resendVerifySignup': //sending the user the verification email
            tokenLink = getLink('register', 'verifyToken', getEmailAndToken(user.email, user.verifyToken));
            email = getEmail(user, 'Verify Signup', tokenLink);
            return sendEmail(email);

          case 'verifySignup': // confirming verification
            email = getEmail(
              user,
              'Confirm Signup',
              'Thanks for verifying your email'
            );
            return sendEmail(email);

          case 'sendResetPwd':
            tokenLink = getLink('reset', 'resetToken', getEmailAndToken(user.email, user.resetToken));
            email = getEmail(user, 'Reset Password', tokenLink);
            return sendEmail(email);
          
          case 'verifySignupSetPassword':
            email = getEmail(user, 'Password reset', '<p>Your password has been reset.</p>');
            return sendEmail(email);

          case 'resetPwd':
            email = getEmail(
              user,
              'Your password was reset',
              'Your password was reset'
            );
            return sendEmail(email);

          case 'passwordChange':
            email = getEmail(
              user,
              'Password reset',
              '<p>Your password has been reset.</p>'
            );
            return sendEmail(email);

          case 'identityChange':
            tokenLink = getLink('verifyChanges', 'verifyToken', user.verifyToken);
            email = getEmail(
              user,
              'Your account was changed. Please verify the changes',
              tokenLink
            );
            return sendEmail(email);

          default:
            throw errors.GeneralError('Error sending email');
        }
      } catch {
        throw errors.GeneralError('Error sending email');
      }
    }
  };
};
