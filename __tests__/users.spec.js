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


describe("smurfs integration tests", () => {
    it("GET /smurfs", async () => {
        const res = await supertest(server).get("/smurfs")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        // expect(res.body).toBeGreaterThan(10)
        expect(res.body[0].name).toBe("Papa Smurf")
    })
    it("GET /smurfs/:id", async () => {
        const res = await supertest(server).get("/smurfs/2")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("Smurfette")
    })
    it("POST /smurfs", async () => {
        const res = await supertest(server)
        .post("/smurfs")
        .send({ name: "Gargomel", age: 500})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("Gargomel")
    })
    it("DELETES /smurf/:id", async () => {
        const res = await supertest(server).delete("/smurfs/9")
        expect(res.statusCode).toBe(204)
    })
})
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