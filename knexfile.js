// Update with your config settings.
const {Pool} = require('pg')
require('dotenv/config')

module.exports = {
  
    client:'postgresql',
    connection: process.env.db,
	pool: {
		min: 2,
		max: 10
	},
    migrations: {
      tableName: 'knex_migrations'
    }
  
}

