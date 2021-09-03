exports.up = function(knex) {
    return knex.schema.createTable("links", (table) => {
        table.increments().primary();
        table.string("name").unique();
        table.string("url");
        table.timestamps(false,true); 
})

    .createTable('tags', (table) => {
        table.increments('id').primary();
        table.string('name').unique();
    })

     .createTable('links_tags', (table) => {
        table.increments().primary();
        table.integer('links_id').unsigned();
        table.foreign('links_id').references('links.id')
        table.integer('tags_id').unsigned();
        table.foreign('tags_id').references('tags.id')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable("links_tags")
    .dropTable("tags")
    .dropTable("links")
};