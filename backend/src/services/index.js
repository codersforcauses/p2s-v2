const users = require('./users/users.service.js');
const feedback = require('./feedback/feedback.service.js');
const programs = require('./programs/programs.service.js');
const reports = require('./reports/reports.service.js');
const schools = require('./schools/schools.service.js');
const sessions = require('./sessions/sessions.service.js');
const students = require('./students/students.service.js');
const mailer = require('./mailer/mailer.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');

// ! not in use
// const activities = require('./activities/activities.service.js');
// const matrix = require('./matrix/matrix.service.js');
// const regions = require('./regions/regions.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(feedback);
  app.configure(programs);
  app.configure(reports);
  app.configure(schools);
  app.configure(sessions);
  app.configure(students);
  app.configure(mailer);
  app.configure(authmanagement);

  // ! not in use
  // app.configure(matrix);
  // app.configure(regions);
  // app.configure(activities);
};
