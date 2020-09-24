const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

beforeEach(async () => {
	await db('users').truncate();
})

afterAll(async () => {
  await db.destroy();
});


// describe("register auth route", () => {
// 	it('should test user registration process', async () => {
// 		const res = await request(server)
// 			.post("/register")
// 			.send({ username: "testUser3", password: "12Ob67bjj6n5" });
// 		expect(res.statusCode).toBe(201);
// 		expect(res.type).toBe("application/json");
// 		expect(res.body.username).toBe("testUser3");
// 	});
// });

describe("login route", () => {
	it('should test user login process', async () => {
		const res = await request(server)
			.post("/login")
			.send({ username: "loginUser", password: "abc123" });
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe("application/json");
		expect(res.body.message).toBe("Welcome testUser!");
	});
});

