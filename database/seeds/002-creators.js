// exports.seed = async function(knex, Promise) {
//   // Deletes ALL existing entries
//   return await knex('creators').del()
//   .then(async function () {
//     // Inserts seed entries
//     return await knex('creators').insert([
//       {
//         id: 1,
//         username: 'testcreator',
//         password: 'Password123'
//       },
//       {
//         id: 2,
//         username: 'testcreator2',
//         password: 'Password123'
//       },
//       {
//         id: 3,
//         username: 'Blobcreator',
//         password: 'Password123'
//       }
//     ]);
//   });
// };


exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  // await knex("creators").truncate();
  await knex("creators").insert([
    {
      id: 1,
      username: 'testcreator',
      password: 'abc123',
      // role: 'creator'
    },
    {
      id: 2,
      username: 'testcreator2',
      password: 'abc123',
      // role: 'creator'

    },
    {
      id: 3,
      username: 'Blobcreator',
      password: 'abc123',
      // role: 'creator'
    }
  ]);
};