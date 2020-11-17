// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const { Admin } = require('./admin/admin.class');
const { Coach } = require('./coach/coach.class');
const createModel = require('../../models/users.model');
const userHooks = require('./users.hooks');
const adminHooks = require('./admin/admin.hooks');
const coachHooks = require('./coach/coach.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));
  const userService = app.service('users');
  userService.hooks(userHooks);
  app.use('/admin', new Admin(options, app));
  const adminService = app.service('admin');
  adminService.hooks(adminHooks);
  app.use('/coach', new Coach(options, app));
  const coachService = app.service('coach');
  coachService.hooks(coachHooks);
};
