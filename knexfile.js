// Update with your config settings.


module.exports = {
  
    client:'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  
}

