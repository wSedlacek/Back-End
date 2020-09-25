describe('pokemon integration tests', () => {
    it('GET /pokemon', async () => {
      const res = await supertest(server).get('/pokemon');
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
      console.log(res.body);
      expect(res.body).toHaveLength(4);
      expect(res.body[0].name).toBe('pikachu');
    });
  
    it('GET /pokemon/id', async () => {
      const res = await supertest(server).get('/pokemon/2');
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(res.body.name).toBe('squirtle');
    });
  
    it('GET /pokemon/id - not found', async () => {
      const res = await supertest(server).get('/pokemon/50');
      expect(res.statusCode).toBe(404);
    });
  
    it('POST /pokemon', async () => {
      const res = await supertest(server)
        .post('/pokemon')
        .send({ name: 'pidgey', password: 'abc123' });
      expect(res.statusCode).toBe(201);
      expect(res.type).toBe('application/json');
      expect(res.body.name).toBe('pidgey');
    });

    it('logs you in', async() => {
        await supertest(server)
                .post('/api/auth/login')
                .send({ username: 'michelle1', password: 'michelle1' })
                .then(res => {
                    expect(res.status).toBe(200)
                })
            })
    it('gives a welcome message', async() => {
        await supertest(server).post('/api/auth/login')
        .send({username: 'michelle9', password: 'michelle9'})
        .then(res => {
                expect(res.body).toEqual({message: `WELCOME michelle9!!!!!!!!!!!`})
    })

    // test in index.js 

    const supertest = require("supertest")
const server = require("../api/server")

test("GET /", async () => {
	const res = await supertest(server).get("/")
	expect(res.statusCode).toBe(200)
	expect(res.type).toBe("application/json")
	expect(res.body.message).toBe("Welcome to our API")
}) 

const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeAll(async () => {
    await db('users').truncate();
  });

afterAll(async () => {
    await db.destroy()
})

describe("testing endpoints", () => {

    // POST
    // 1
    it("POST /register returns 201", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({ username: "test125", password: "test125"})
            expect(res.statusCode).toBe(201)
            expect(res.body.username).toBe("test125")
    })

    // 2
    it("POST /register returns json", async () => {
        const res = await supertest(server)
            .post("/api/auth/register")
            .send({ username: "test123", password: "test123"})
            expect(res.type).toBe("application/json")
    })

    // LOGIN
    // 1
    it("POST /login returns 200", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({ username: "test125", password: "test125"})
            expect(res.statusCode).toBe(200)
    })

    // 2
    it("POST /login returns json message", async () => {
        const res = await supertest(server)
            .post("/api/auth/login")
            .send({username: "test125", password: "test125"})
            expect(res.type).toBe("application/json")
            expect(res.body.message).toBe("Welcome test125!")
    })

    // JOKES
    // 1
    it("GET /jokes return json", async () => {
        const res = await supertest(server).get("/api/jokes")
        expect(res.type).toBe("application/json")
    })

    // 2
    it("GET /jokes to return 401 if not authorized", async () => {
        const res = await supertest(server).get("/api/jokes")
        expect(res.statusCode).toBe(401)
    })

})


describe("Register user", () => {
    it("POST /auth/register - should return a status of 409 - username already taken", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send({ username: "sarah", password: "law" });
      expect(res.statusCode).toBe(409);
      expect(res.body.message).toBe("Username is already taken");
    });

    it("POST /auth/register - should return a status of 500 - username hasn't been entered", async () => {
      const res = await supertest(server)
        .post("/api/auth/register")
        .send({ password: "law" });
      expect(res.statusCode).toBe(500);
    });
    it("POST /auth/register - returns json object", async () => {
        const res = await supertest(server)
          .post("/api/auth/register")
          .send({ username: "catlady", password: "law" });
        expect(res.type).toBe("application/json")
      })