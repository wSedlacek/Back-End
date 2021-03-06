
require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/users.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds'  
    },
  },
  test: {
		client: "sqlite3",
		connection: {
			filename: "./database/test.db3"
		},
		useNullAsDefault: true,
		migrations: {
			directory: "./database/migrations"
		},
		seeds: {
			directory: "./database/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      },
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: './database/seeds'
    },
  },
}