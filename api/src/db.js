const knex = require('knex');

export const db = knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  // searchPath: ['p2s', 'public'],
});



