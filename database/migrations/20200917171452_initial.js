exports.up = async function (knex) {
    await knex.schema
      .createTable("users", (tbl) => {
          tbl.increments("id");
          tbl.text("username").notNull().unique();
          tbl.text("password").notNull();
    });
    await knex.schema
      .createTable("creators", (tbl) => {
          tbl.increments("id");
          tbl.text("username").notNull().unique();
          tbl.text("password").notNull();
    });

    await knex.schema
      .createTable("tutorials", (tbl) => {
          tbl.increments("id");
          tbl.text("title").notNull();
          tbl.text("materials").notNull();
          tbl.text("directions").notNull();
          tbl.integer("likes");
          tbl.boolean("is_saved");

          tbl.integer("creator_id")
            .references("id")
                  .inTable("creators")
                  .onUpdate("CASCADE")
                  .onDelete("CASCADE")
                  .unsigned()
                  .notNull();
    });
      
   await knex.schema
      .createTable("saved_user_tutorials", (tbl) => {
        // tbl.increments("id");
        tbl.text("title").notNull();
        tbl.text("materials").notNull();
        tbl.text("directions").notNull();
        tbl.integer("likes");
        tbl.boolean("is_saved").notNull().defaultTo(false);
      
          tbl.integer("user_id")
          .references("id")
          .inTable("users")
                .unsigned()
                .notNull()
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

          tbl.integer("tutorial_id")
          .references("id")              
          .inTable("tutorials")
                .notNull()
                .unsigned()
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

          tbl.primary(['user_id','tutorial_id'])
    }); 

 };
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("saved_user_tutorials");
    await knex.schema.dropTableIfExists("tutorials");
    await knex.schema.dropTableIfExists("creators");
    await knex.schema.dropTableIfExists("users");
  };