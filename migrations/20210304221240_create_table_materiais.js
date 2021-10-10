
exports.up = async function(knex) {
    return knex.schema.createTable('materiais', table => {
        table.increments('id').primary()
        table.string('codigo').notNull().unique()
        table.string('name').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('materiais')
};
