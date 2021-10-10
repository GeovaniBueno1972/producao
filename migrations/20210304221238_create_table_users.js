
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('password').notNull()
        table.enu('funcao', ['vendedor', 'producao', 'administracao']).notNull()

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
