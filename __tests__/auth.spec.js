const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

beforeEach(async () => {
	await db('users').truncate();
})

describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })

// describe('Login', () => {
//     it('succeeds with correct credentials', async () => {
//       const response = await post(`login`, demoUser)
//         .expect(200);
//        expect(res.body.user.email).toBe(demoUser.email);
//      });
//     it('fails with invalid credentials', async () => {
//       const user = {email:'notarealmail@mycompany.com', password: 'somepassword'};
//       await post(`login`, user)
//         .expect(401);
//      });
//     it('fails with missing credentials', async () => {
//       const user = {};
//       await post(`login`, user)
//         .expect(401);
//      });
//    });

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

// describe("login route", () => {
// 	it('should test user login process', async () => {
// 		const res = await request(server)
// 			.post("/login")
// 			.send({ username: "loginUser", password: "abc123" });
// 		expect(res.statusCode).toBe(200);
// 		expect(res.type).toBe("application/json");
// 		expect(res.body.message).toBe("Welcome testUser!");
// 	});
// });

// describe("Testing the auth login/register API", () => {
// 	it("should test the base route and returns true for status", async () => {

// 		const res = await supertest(app).get('/');

// 		expect(res.status).toBe(200);
// 	});


// 	it("should test the post login endpoint and have welcome message", async () => {

// 		const res = await supertest(app).get('/movies');
// 		expect(res.type).toBe("application/json");
// 		expect(res.status).toBe(200);
// 		expect(res.body.message).toBe("Welcome loginUser!");

// 	});

// });