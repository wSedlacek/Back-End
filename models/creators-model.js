const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig")

async function add(creator) {
	creator.password = await bcrypt.hash(creator.password, 13);

	const [id] = await db("creators").insert(creator);
	return findById(id);
}

function find() {
	return db("creators").select("id", "username")
}

function findBy(filter) {
	return db("creators")
		.select("id", "username", "password")
		.where(filter)
}

function findById(id) {
	return db("creators")
		.select("id", "username")
		.where({ id })
		.first()
}

function update(id, changes) {
    return db('creators')
      .where({ id })
      .update(changes, '*');
} 

function remove(id) {
    return db('creators')
      .where({ id })
      .del();
}

// // function findAllCreatedTutorials(id) {
// //     return db("creators")
// //         .select("id", "tutorials")
// // // }
// function findAllCreatedTutorials(creator_id) {
//     return db("creator_tutorials")
// 		.select("creator_id", "tutorials")
// 		.where({ creator_id })
// }

// function findCreatedTutorialById(creator_id) {
//     return db("creator_tutorials")
// 		.select("creator_id", "tutorials")
// 		.where({ creator_id })
// 		.first()
// }

// // function removeCreatedTutorialById(id) {
// // 	return db('creators')
// // 	  .select("id", "tutorials")
// // 	  .where({ id })
// function removeCreatedTutorialById(creator_id) {
// 	return db("creator_tutorials")
// 	  .where({ creator_id })
// 	  .del();
// }


module.exports = {
	add,
	find,
	findBy,
	findById,
	// findAllCreatedTutorials,
	// findCreatedTutorialById,
    update,
	remove,
	// removeCreatedTutorialById
}
