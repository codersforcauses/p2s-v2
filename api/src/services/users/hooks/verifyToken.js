const { GeneralError } = require('@feathersjs/errors');

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
  return context?.params?.query?.verifyToken ?? false;
};

const restrictVerifyQuery = () => context => {
  context.params.query = { verifyToken: context.params.query.verifyToken ?? '' };
  console.log(context);
  return context;
};

const restrictVerifyData = () => context => {
  const { name, email, admin, coach } = context.result?.data[0] ?? {};
  if(name || email || admin || coach) {
    context.dispatch = {
      name,
      email,
      admin,
      coach
    };
  } else context.dispatch = {};
  return context;
};

module.exports = {
  hasVerifyToken,
  restrictVerifyQuery,
  restrictVerifyData
};