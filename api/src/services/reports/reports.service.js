// Initializes the `reports` service on path `/reports`
const { Reports } = require('./reports.class');
const createModel = require('../../models/reports.model');
const hooks = require('./reports.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
  };

  // Initialize our service with any options it requires
  app.use('/reports', new Reports(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reports');

  service.hooks(hooks);
};
