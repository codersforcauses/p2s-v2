// Initializes the `sessions` service on path `/sessions`
const { Sessions } = require('./sessions.class');
const createModel = require('../../models/sessions.model');
const hooks = require('./sessions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use('/sessions', new Sessions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sessions');

  service.hooks(hooks);
};
