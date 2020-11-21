const {
  GeneralError,
  NotAuthenticated,
  Forbidden,
} = require('@feathersjs/errors');

/**
 * Blocks patch requests with incorrect verify tokens
 * @param {Object} context Context object passed from server
 */
module.exports = () => async context => {
  if (context.method !== 'patch') {
    throw new GeneralError(
      'verifyRegisterToken should only be used in a patch hook.'
    );
  }
  if (!context.data.tempAuth) {
    throw new NotAuthenticated('No verify token provided.');
  }
  const user = await context.app.services.users.find({
    query: {
      verifyToken: context.data.tempAuth,
    },
  });

  console.log(user); //TODO remove
  if (user.total === 1) {
    if (context.id !== user.data[0]._id.toString()) {
      throw new Forbidden('Verify token provided does not match queried user.');
    }
  } else {
    throw new NotAuthenticated('Invalid verify token provided.');
  }
  return context;
};
