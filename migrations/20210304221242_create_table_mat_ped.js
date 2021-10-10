
exports.up = function(knex) {
    return knex.schema.createTable('mat_ped', table => {
        table.increments('id').notNull()
        table.integer('pedido_numero').references('numero').inTable('pedidos').notNull()
        table.integer('material_id').references('id').inTable('materiais').notNull()
        table.integer('quantidade').notNull()
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('mat_ped')
  };
