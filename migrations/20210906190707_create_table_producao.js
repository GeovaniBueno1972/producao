
exports.up = function(knex) {
    return knex.schema.createTable('producao', table => {
        table.increments('id').primary()
        table.timestamp('data_ini_producao').defaultTo(knex.fn.now())
        table.integer('user_id').references('id')
            .inTable('users').notNull()
        table.integer('pedido_numero').references('numero')
            .inTable('pedidos').notNull()
        table.date('data_conclusao')
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('producao')
};
