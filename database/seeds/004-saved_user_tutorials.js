exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  // await knex("saved_user_tutorials").truncate();
  await knex("saved_user_tutorials").insert([
    {
      title: "How to pass build week",
      materials: "internet and computer",
      directions: "work hard as a group to finish",
      likes: 123,
      is_saved: true,
      user_id: 1,
      tutorial_id: 1
    },
  ]);
};