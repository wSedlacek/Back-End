exports.seed = async function(knex) {
  await knex("users").truncate()
  await knex("creators").truncate()
  await knex("tutorials").truncate()
  await knex("saved_user_tutorials").truncate()
}

// use knex clean-up library instead