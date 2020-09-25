const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig")

async function add(user) {
	user.password = await bcrypt.hash(user.password, 13);

	const [id] = await db("users").insert(user, "id");
	return findById(id);
}

function find() {
	return db("users").select("id", "username")
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
		.where(filter)
}

function findById(id) {
	return db("users")
		.select("id", "username")
		.where({ id })
		.first()
}

function update(id, changes) {
    return db('users')
      .where({ id })
      .update(changes, '*');
} 

function remove(id) {
    return db('users')
      .where({ id })
      .del();
}

// function findAllSavedTutorials(id) {
//     return db("users")
//         .select("id", "tutorials")
// }
function findAllSavedTutorials(user_id) {
    return db("saved_user_tutorials")
		.select("user_id", "tutorials")
		.where({ user_id })
}

function findSavedTutorialById(user_id) {
    return db("users")
		.select("id", "tutorials")
		.where({ user_id })
		.first()
}

// function removeSavedTutorialById(id) {
// 	return db('users')
// 	  .select("id", "tutorials")
// 	  .where({ id })
function removeSavedTutorialById(user_id) {
	return db("saved_user_tutorials")
	  .where({ user_id })
	  .del();
}


module.exports = {
	add,
	find,
	findBy,
	findById,
	findAllSavedTutorials,
	findSavedTutorialById,
    update,
	remove,
	removeSavedTutorialById
}
