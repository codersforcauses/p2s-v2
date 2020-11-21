const { GeneralError } = require('@feathersjs/errors');

/**
 * Returns true if a query contains a verify token
 * @param {Object} context Context object passed from server
 */

module.exports = () => async context => {
  if (context.method !== 'find') {
    throw new GeneralError(
      'verifyRegisterToken should only be used in a find hook.'
    );
  }
  return context?.params?.query?.verifyToken ?? false;
};
