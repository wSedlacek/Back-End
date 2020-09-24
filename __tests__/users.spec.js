const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");


beforeEach(async () => {
    // run the seed db automatically with each test, to get a fresh database
	// await db.seed.run()
	await db('users').truncate();
})

afterAll(async () => {
  // close the database connection so the test process doesn't hang or give a warning
  await db.destroy();
});



// describe("users integration tests", () => {
// 	it('should /GET /api/users', async () => {
// 	  const fakeServer = request(server);
// 	  const res = await fakeServer.get('/api/users')
// 	  expect(res.statusCode).toBe(200)
// 	  expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
// 	}); // how to refactor for varying cases of being logged in or not?
// 	it('should return a JSON object', () => {
// 		return request(server).get('/api/users/')
// 		.then(jokes => {
// 			expect(jokes.type).toEqual("application/json")
// 		})
// 	});
// 	it('should return a 200 status code if logged in', () => {
//         return request(server).get('/api/users')
//         .then(user => {
//             expect(user.status).toEqual(200)
//         })
//     });
//   })