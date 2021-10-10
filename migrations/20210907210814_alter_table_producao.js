
exports.up = function(knex) {
    return knex.schema.alterTable('producao', table => {
            table.date('data_conclusao').alter()
           
    })
  
};

exports.down = function(knex) {
    return knex.schema.alterTable('producao', table => {
        table.date('data_conclusao').notNull()
    })
};
