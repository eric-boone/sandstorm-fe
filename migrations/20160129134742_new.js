exports.up = function(knex, Promise) {
  return knex.schema.createTable('sandyclean', function(table){
    table.increments();
    table.string('name');
    table.string('email');
    table.integer('quantity');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sandyclean');
};
