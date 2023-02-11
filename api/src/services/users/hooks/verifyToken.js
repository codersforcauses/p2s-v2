const { GeneralError, BadRequest } = require('@feathersjs/errors');

/**
 * Returns true if a query contains a verify token
 * @param {Object} context Context object passed from server
 */

const hasVerifyToken = () => async context => {
  if (context.method !== 'find') {
    throw new GeneralError(
      'hasVerifyToken should only be used in a find hook.'
    );
  }
  return !!context?.params?.query?.verifyToken;
};

const restrictVerifyQuery = () => context => {
  context.params.query = { verifyToken: context.params.query.verifyToken ?? '' };
  return context;
};

module.exports = {
  hasVerifyToken,
  restrictVerifyQuery,
};