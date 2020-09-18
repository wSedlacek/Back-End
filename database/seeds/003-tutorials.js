// exports.seed = async function(knex, Promise) {
//   // Deletes ALL existing entries
//   return await knex('tutorials').del()
//   .then(async function () {
//     // Inserts seed entries
//     return await knex("tutorials").insert([
//       {
//         id: 1,
//         title: "How to pass build week",
//         materials: "internet and computer",
//         description: "work hard as a group to finish",
//         is_liked: false,
//         is_saved: false,
//         user_id: 1
//       },
//       {
//         id: 2,
//         title: "Another tutorial how-to",
//         materials: "internet and computer",
//         description: "Step 1. Move on to step 2. Step 2. Finish.",
//         is_liked: true,
//         is_saved: false,
//         creator_id: 1
//       },
//     ]);
//   });
// };



exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  // await knex("tutorials").truncate();
  await knex("tutorials").insert([
    {
      id: 1,
      title: "How to pass build week",
      materials: "internet and computer",
      directions: "work hard as a group to finish",
      is_saved: true,
      likes: false,
      creator_id: 1
    },
    {
      id: 2,
      title: "Another tutorial how-to",
      materials: "internet and computer",
      directions: "Step 1. Move on to step 2. Step 2. Finish.",
      is_saved: false,
      likes: true,
      creator_id: 2
    },
  ]);
};