const knexCleaner = require('knex-cleaner');

exports.seed = async function(knex) {
  await knexCleaner.clean(knex);
}

// use knex clean-up library instead