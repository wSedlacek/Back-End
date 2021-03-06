const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");


beforeEach(async () => {
	await db('tutorials').truncate();
})

afterAll(async () => {
  await db.destroy();
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

  it("tests the post new movies endpoint and returns as success message", async () => {

    const response = await supertest(app).post('/movies').send({
        title: 'New Movie',
        synopsis: 'Synopsis of the new movie',
        rating: 'PG'
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Movies Saved Successfully.');

});