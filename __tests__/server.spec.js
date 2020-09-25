const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

beforeEach(async () => {
	await db('users').truncate();
})

afterAll(async () => {
  await db.destroy();
});

describe("GET /", () => {
	it('should GET /', async () => {
		const res = await request(server).get('/')
		expect(res.statusCode).toBe(200)
		expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
	})
})

describe('Login', () => {
 it('succeeds with correct credentials', async () => {
   const response = await post(`login`, demoUser)
     .expect(200);
    expect(res.body.user.email).toBe(demoUser.email);
  });
 it('fails with invalid credentials', async () => {
   const user = {email:'notarealmail@mycompany.com', password: 'somepassword'};
   await post(`login`, user)
     .expect(401);
  });
 it('fails with missing credentials', async () => {
   const user = {};
   await post(`login`, user)
     .expect(401);
  });
});

// describe("jokes integration tests", () => {
// 	it('should /GET /api/jokes', async () => {
// 	  const fakeServer = request(server);
// 	  const res = await fakeServer.get('/api/jokes')
// 	  expect(res.statusCode).toBe(200)
// 	  expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
// 	}); // how to refactor for varying cases of being logged in or not?
// 	it('should return a JSON object', () => {
// 		return request(server).get('/api/jokes/')
// 		.then(jokes => {
// 			expect(jokes.type).toEqual("application/json")
// 		})
// 	});
// 	it('should return a 200 status code if logged in', () => {
//         return request(server).get('/api/jokes/')
//         .then(jokes => {
//             expect(jokes.status).toEqual(200)
//         })
//     });
//   })