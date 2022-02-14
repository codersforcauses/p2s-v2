const { GeneralError, BadRequest } = require('@feathersjs/errors');

/**
 * Returns true if a query contains a verify token
 * @param {Object} context Context object passed from server
 */

const hasVerifyToken = () => async context => {
  if (context.method !== 'find') {
    throw new GeneralError(
      'verifyRegisterToken should only be used in a find hook.'
    );
  }
  return !!context?.params?.query?.verifyToken;
};

const restrictVerifyQuery = () => context => {
  context.params.query = { verifyToken: context.params.query.verifyToken ?? '' };
  return context;
};

const restrictVerifyData = () => context => {
  if(context.result?.data[0]) {
    delete context.dispatch.data[0].password;
    delete context.dispatch.data[0].verifyExpires;
    delete context.dispatch.data[0].updatedAt;
  } else throw new BadRequest('Verify token invalid');
  return context;
};

module.exports = {
  hasVerifyToken,
  restrictVerifyQuery,
  restrictVerifyData
};