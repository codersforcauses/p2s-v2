const { GeneralError } = require('@feathersjs/errors');

/**
 * Returns true if the user is the owner of the field they're patching
 * @param {Object} context Context object passed from server
 */
module.exports = () => context => {
  if (context.method === 'create') {
    throw new GeneralError('isOwner should not be used in a create hook.');
  }
  const { user } = context.params;
  return context.id === user._id.toString();
};
