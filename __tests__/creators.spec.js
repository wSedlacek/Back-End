const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

beforeEach(async () => {
	await db('creators').truncate();
})

afterAll(async () => {
  await db.destroy();
});



describe("creators route", () => {
	it('should test creator login process', async () => {
		const fakeServer = request(server);
		await fakeServer
			.post("/api/auth/login")
			.send({ username: "testUser", password: "12Ob67b6nt5" });
		const res = await fakeServer.get("/api/jokes");
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe("application/json");
	});
});

describe("jokes integration tests", () => {
	it('should /GET /api/jokes', async () => {
	  const fakeServer = request(server);
	  const res = await fakeServer.get('/api/jokes')
	  expect(res.statusCode).toBe(200)
	  expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
	}); // how to refactor for varying cases of being logged in or not?
	it('should return a JSON object', () => {
		return request(server).get('/api/jokes/')
		.then(jokes => {
			expect(jokes.type).toEqual("application/json")
		})
	});
	it('should return a 200 status code if logged in', () => {
        return request(server).get('/api/jokes/')
        .then(jokes => {
            expect(jokes.status).toEqual(200)
        })
    });
  })