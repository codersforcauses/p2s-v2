/* eslint-disable no-param-reassign */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { Forbidden, Unprocessable } = require('@feathersjs/errors');

/**
 * Limits access to an endpoint based off a users permissions
 * @param {Object} options Options passed in from previous hooks
 * @param {[String]} options.roles Define which roles can access this route.
 * Should be in the form ['admin', 'coach']
 */
module.exports = (options = {}) => context => {
  if (context.type !== 'before') {
    throw new Unprocessable(
      // eslint-disable-next-line quotes
      "The feathers-permissions hook should only be used as a 'before' hook."
    );
  }
  const { user } = context.params;

  if (!user) {
    if (context.params.provider) {
      throw new Forbidden(
        'You do not have the correct permissions (invalid permission entity).'
      );
    }

    return context;
  }

  const roles = ['admin', 'manager', 'coach'];
  const permissions = [];

  roles.forEach(role => user[role].is && permissions.push(role));

  const permitted = permissions.some(permission =>
    options.roles.includes(permission)
  );

  context.params.permitted = context.params.permitted || permitted;

  if (
    context.params.provider &&
    options.error !== false &&
    !context.params.permitted
  ) {
    throw new Forbidden('You do not have the correct permissions.');
  }

  return context;
};
