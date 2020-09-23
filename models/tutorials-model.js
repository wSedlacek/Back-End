const db = require("../database/dbConfig")

async function add(tutorial) {
	const [id] = await db("tutorials").insert(tutorial);
	return findById(id);
}

function find() {
	return db("tutorials").select("id", "title", "materials", "directions", "likes", "is_saved")
}

function findBy(filter) {
	return db("tutorials")
		.select("id", "title", "materials", "directions", "likes", "is_saved", "creator_id")
		.where(filter)
}

function findById(id) {
	return db("tutorials")
		.select("id", "title", "materials", "directions", "likes", "is_saved", "creator_id")
		.where({ id })
		.first()
}

function update(id, changes) {
    return db('tutorials')
      .where({ id })
      .update(changes, '*');
} 

function remove(id) {
    return db('tutorials')
      .where({ id })
      .del();
}

module.exports = {
	add,
	find,
	findBy,
	findById,
    update,
	remove,
}
