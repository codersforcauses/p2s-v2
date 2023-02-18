const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword,
  protect,
} = require('@feathersjs/authentication-local').hooks;
const {
  disallow,
  iff,
  isProvider,
  preventChanges,
  some,
} = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;
const accountService = require('../authmanagement/notifier');
const isOwner = require('./hooks/isOwner');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      authenticate('jwt'),
      hashPassword('password'),
      iff(isProvider('external'), verifyHooks.addVerification()),
    ],
    update: [disallow('external')],
    patch: [
      iff(
        isProvider('external'),
        preventChanges(
          false,
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        ),
        hashPassword('password'),
        authenticate('jwt')
        ),
        iff(
          isOwner(),
          preventChanges(
            false,
            'coach',
            'admin'
          ),
        )
    ],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [],
    get: [],
    create: [
      iff(
        some(
          isProvider('external'),
          () => process.env.NODE_ENV === 'production'
        ),
        context => {
          accountService(context.app).notifier(
            'resendVerifySignup',
            context.result
          );
        },
      ),
    ],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
