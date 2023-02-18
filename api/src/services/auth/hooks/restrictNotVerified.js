const { NotAuthenticated } = require('@feathersjs/errors')

/**
 * Returns throws error if user is not verified
 * @param {Object} context Context object passed from server
 */
module.exports = () => async context => {
    const authenticatingUser = (await context.app.services.users.find({ query: { email: context.data?.email }}))[0]
    if (!authenticatingUser || !authenticatingUser.isVerified) throw new NotAuthenticated('User is not verified');
  };
  