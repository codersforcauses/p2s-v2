const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
    logger.info('Attempting to connect to database...')
    mongoose
    .connect(app.get('mongodb'))
    .then((info) => logger.info(`Database connection established: ${info.connections[0].name}`))
    .catch((err) => {
      throw new Error(`Failed to establish database connection: ${err}`);
    });
    
    mongoose.Promise = global.Promise;
    
    app.set('mongooseClient', mongoose);
};
