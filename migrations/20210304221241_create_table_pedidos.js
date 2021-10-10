
exports.up = function(knex) {
    return knex.schema.createTable('pedidos', table => {
        table.integer('numero').notNull().primary()
        table.timestamp('data_lancamento').defaultTo(knex.fn.now())
        table.date('data_entrega').notNull()
        table.integer('user_id').references('id')
            .inTable('users').notNull()
        table.integer('cliente_id').references('id').inTable('clientes').notNull()
        table.enu('estado', ['Aguardando', 'Producao', 'Impedimento', 'Concluido'])
            .notNull()
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('pedidos')
};