// Update with your config settings.


module.exports = {
  
    client:'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
      connectionOptions: {
        DateStyle: 'ISO,DMY',
      }
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  
}

