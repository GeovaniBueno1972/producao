
exports.up = function(knex) {
  return knex.schema.altertable('materiais', table => {
    table.enu('unidade', ['CH', 'UN', 'ML'])
    .notNull()
  })
};

exports.down = function(knex) {
  
};
