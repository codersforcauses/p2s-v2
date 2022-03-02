/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const seeder = require('./seeder');
const port = app.get('port');
const host = app.get('host');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

if (process.env.NODE_ENV === 'development') {
  app.configure(seeder);
}

server.on('listening', () => {
  logger.info('Starting in ' + process.env.NODE_ENV + ' mode.');
  logger.info(
    'Application started on http://%s:%d',
    host,
    port
  );
});
