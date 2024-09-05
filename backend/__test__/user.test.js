const request = require("supertest")
const app = require("../app");
const { hash } = require("../helpers/bcrypt");
const { sequelize } = require("../models");

const dataLogin = {
  email: "rizky@gmail.com",
  password: "12345",
};
beforeAll(async () => {
  let admin = [
    {
      username: "Rizky",
      email: "rizky@gmail.com",
      password: hash("12345"),
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  await sequelize.queryInterface.bulkInsert("Users", admin);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
});

describe("POST /login", () => {
  describe("POST /login - succed", () => {
    it("should be return an object with message", async () => {
      const response = await request(app).post("/login").send(dataLogin);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("POST /login - fail", ()=> {
    it('should be return an object with error message', async ()=> {
        const body = { email: '', password: '12345' }
            const response = await request(app).post('/login').send(body)

            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Please input email or password' )
    })
    it('should be return an object with error message', async ()=> {
        const body = { email: 'rizky@gmail.com', password: '' }
            const response = await request(app).post('/login').send(body)

            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Please input email or password')
    })
    it('should be return an object with error message', async ()=> {
        const body = { email: 'rizkkky@gmail.com', password: '12345' }
            const response = await request(app).post('/login').send(body)

            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Invalid email or password')
    })
    it('should be return an object with error message', async ()=> {
        const body = { email: 'rizky@gmail.com', password: '1234534' }
            const response = await request(app).post('/login').send(body)

            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Invalid email or password')
    })
  } )
});
