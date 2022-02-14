const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword,
  protect,
} = require('@feathersjs/authentication-local').hooks;
const {
  disallow,
  iff,
  iffElse,
  isProvider,
  preventChanges,
  some,
} = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;
const accountService = require('../authmanagement/notifier');
const {hasVerifyToken, restrictVerifyQuery, restrictVerifyData } = require('./hooks/verifyToken');

module.exports = {
  before: {
    all: [],
    find: [ iffElse(hasVerifyToken(), restrictVerifyQuery(), authenticate('jwt'))],
    get: [authenticate('jwt')],
    create: [
      hashPassword('password'),
      iff(isProvider('external'), verifyHooks.addVerification()),
    ],
    update: [disallow('external')],
    patch: [
      iff(
        isProvider('external'),
        preventChanges(
          true,
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
    ],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),
    ],
    find: [iff(hasVerifyToken(), restrictVerifyData())],
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
        verifyHooks.removeVerification()
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
