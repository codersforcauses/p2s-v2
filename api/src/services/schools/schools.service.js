const knexService = require('feathers-knex');
const model = require('./schools.model');
const hooks = require('./schools.hooks');

module.exports = function (app) {
  app.use('/schools', knexService({
    Model: model,
    name: 'schools'
  }));

  const service = app.service('schools');

  service.hooks(hooks);
};
