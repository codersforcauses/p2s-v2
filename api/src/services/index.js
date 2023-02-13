const auth = require('./auth/auth.service.js');
const users = require('./users/users.service.js');
const reports = require('./reports/reports.service.js');
const schools = require('./schools/schools.service.js');
const sessions = require('./sessions/sessions.service.js');
const students = require('./students/students.service.js');
const mailer = require('./mailer/mailer.service.js');
const authmanagement = require('./authmanagement/authmanagement.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(auth);
  app.configure(users);
  app.configure(reports);
  app.configure(schools);
  app.configure(sessions);
  app.configure(students);
  app.configure(mailer);
  app.configure(authmanagement);
};
