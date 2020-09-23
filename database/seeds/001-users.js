// exports.seed = async function(knex, Promise) {
//   // Deletes ALL existing entries
//   return await knex('users').del()
//   .then(async function () {
//     // Inserts seed entries
//     return await knex('users').insert([
//       {
//         id: 1,
//         username: 'testuser',
//         password: 'Password123'
//       },
//       {
//         id: 2,
//         username: 'testuser2',
//         password: 'Password123'
//       },
//       {
//         id: 3,
//         username: 'Blobross',
//         password: 'Password123'
//       }
//     ]);
//   });
// };



exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  // await knex("users").truncate();
  await knex("users").insert([
    {
      id: 1,
      username: 'testuser',
      password: 'Password123',
      // role: 'user'
    },
    {
      id: 2,
      username: 'testuser2',
      password: 'Password123',
      // role: 'user'
    },
    {
      id: 3,
      username: 'Blobross',
      password: 'Password123',
      // role: 'user'
    }
  ]);
};