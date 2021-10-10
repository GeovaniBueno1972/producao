
exports.up = function(knex) {
    return knex.schema.createTable('clientes', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('fone').notNull()
        table.string('bairro').notNull()
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('clientes')
};
