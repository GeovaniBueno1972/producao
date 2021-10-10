// Update with your config settings.


module.exports = {
  
    client:'postgresql',
    connection: {
      database: process.env.database,
      user: process.env.user,
      password: process.env.password,
      port: process.env.port,
      host: process.env.host,
      charset: process.env.charset,
      ssl: {
        rejectUnauthorized: false
      }
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  
}

