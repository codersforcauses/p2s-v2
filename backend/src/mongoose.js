const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  mongoose
    .connect(app.get('mongodb'))
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
