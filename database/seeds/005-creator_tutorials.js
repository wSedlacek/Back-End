exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  // await knex("saved_user_tutorials").truncate();
  await knex("creator_tutorials").insert([
    {
      // id: 1,
      title: "How to pass build week",
      materials: "internet and computer",
      directions: "work hard as a group to finish",
      likes: 12,
      // is_saved: true,
      creator_id: 1, // references id in creator table
      tutorial_id: 1 // references id in tutorial table
    },
  ]);
};