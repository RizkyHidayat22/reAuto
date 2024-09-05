const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { hash } = require("../helpers/bcrypt");
const { makeToken } = require("../helpers/jwt");
const { NUMBER } = require("sequelize");

let body = {
  name: "UT One Piece 25th Lengan Pendek",
  description: "Luffy dan Trafalgar Law membentuk aliansi bajak laut untuk mengalahkan Doflamingo. Desainnya menggambarkan adegan di mana Luffy dan Law bekerja sama untuk menghadapi musuh kuat Doflamingo. TV animation ONE PIECE 25th",
  price: 199000,
  stock: 100,
  imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/473494/item/idgoods_09_473494.jpg?width=750",
  categoryId: 1,
};
const payload = {
  id: 1,
  email: "rizky@gamil.com",
  role: "Admin",
};

const payloadStaff = {
  id: 2,
  email: "za@gamil.com",
  role: "Staff",
};
let access_token = makeToken(payload);
let access_token_staff = makeToken(payloadStaff);
beforeAll(async () => {
  let dataUser = require("../data/user.json").map((el) => {
    el.createdAt = el.updatedAt = new Date();
    el.password = hash(el.password);
    return el;
  });
  await sequelize.queryInterface.bulkInsert("Users", dataUser);

  let dataCategory = require("../data/category.json").map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
  });
  await sequelize.queryInterface.bulkInsert("Categories", dataCategory);

  let dataProduct = require("../data/product.json").map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
  });
  await sequelize.queryInterface.bulkInsert("Products", dataProduct);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
  await sequelize.queryInterface.bulkDelete("Categories", null, { truncate: true, cascade: true, restartIdentity: true });
  await sequelize.queryInterface.bulkDelete("Products", null, { truncate: true, cascade: true, restartIdentity: true });
});

describe("POST /products", () => {
  describe("POST /products - succeed", () => {
    it.only("should be return new product an object", async () => {
      const response = await request(app).post("/products").send(body).set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });
  });

  describe("POST /product - fail", () => {
    it("should be return an object with error message", async () => {
      const response = await request(app).post("/products").send(body);

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "please login first");
    });

    it("should be return an object with error message", async () => {
      const response = await request(app).post("/products").send(body).set("Authorization", "Bearer access_token");

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "invalid token");
    });

    it("should be return an object with error message", async () => {
      const bodyFalse = {
        name: "",
        description: "",
        price: 100000,
        stock: 100,
        imgUrl: "",
        categoryId: 1,
      };
      const response = await request(app).post("/products").send(bodyFalse).set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

const bodyUpdate = {
  name: "T-Shirt DRY-EX | Lengan Pendek Ringan",
  description: "Desain lengan pressure-bonding dan jahitan pada bagian kerah yang mengutamakan kenyamanan",
  price: 199000,
  stock: 100,
  imgUrl: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/473157/item/idgoods_24_473157.jpg?width=750",
  categoryId: 1,
};

const bodyFail = {
  name: "",
  description: "Desain lengan pressure-bonding dan jahitan pada bagian kerah yang mengutamakan kenyamanan",
  price: 199000,
};

describe("PUT /products/:id", () => {
  describe("PUT /products/:id - succeed", () => {
    it("should be return update product an object", async () => {
      const response = await request(app).put("/products/1").send(bodyUpdate).set("Authorization", `Bearer ${access_token_staff}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });
  });

  describe("PUT / products/:id - fail", () => {
    it("should be return with massage error", async () => {
      const response = await request(app).put("/products/1").send(bodyUpdate);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "please login first");
    });

    it("should be return with massage error", async () => {
      const response = await request(app).put("/products/1").send(bodyUpdate).set("Authorization", `Bearer access_token_staff`);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "invalid token");
    });

    it("should be return with massage error", async () => {
      const response = await request(app).put("/products/100").send(bodyUpdate).set("Authorization", `Bearer ${access_token_staff}`);
      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Data not found");
    });

    it("should be return with massage error", async () => {
      const response = await request(app).put("/products/6").send(bodyUpdate).set("Authorization", `Bearer ${access_token_staff}`);
  
      expect(response.status).toBe(403);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "you don't have permission");
    });

    it("should be return with massage error", async () => {
      const response = await request(app).put("/products/2").send(bodyFail).set("Authorization", `Bearer ${access_token_staff}`);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

describe("DEL /products/:id", () => {
  describe("DEL /products/:id - success", () => {
    it("should be delete data and return message", async () => {
      const response = await request(app).delete("/products/3").send(body).set("Authorization", `Bearer ${access_token_staff}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("DEL /products/:id - fail", () => {
    it("should be return with massage error", async () => {
      const response = await request(app).delete("/products/3").send(body);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "please login first");
    });

    it("should be return with massage error", async () => {
      const response = await request(app).delete("/products/3").send(body).set("Authorization", `Bearer access_token_staff`);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "invalid token");
    });

    it("should be return with massage error", async () => {
      const response = await request(app).delete("/products/100").send(body).set("Authorization", `Bearer ${access_token_staff}`);
      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Data not found");
    });

    it("should be return with massage error", async () => {
      const response = await request(app).delete("/products/6").send(body).set("Authorization", `Bearer ${access_token_staff}`);
      expect(response.status).toBe(403);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "you don't have permission");
    });
  });
});

describe("GET pub/products/:id", () => {
  describe("GET pub/products/:id - succeed", () => {
    it("should be return product an object", async () => {
      const response = await request(app).get("/pub/products/1").send(body);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });
  });

  describe("GET pub/products/:id - fail", () => {
    it("should be return messsage Error", async () => {
      const response = await request(app).get("/pub/products/1000").send(body);
      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Data not found");
    });
  });
});

describe("GET pub/products", () => {
  describe("GET pub/products - success", () => {
    it("Should be return data as object", async () => {
      const response = await request(app).get("/pub/products");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("page", expect.any(Number));
      expect(response.body).toHaveProperty("totalProduct", expect.any(Number));
      expect(response.body).toHaveProperty("totalPage", expect.any(Number));
      expect(response.body).toHaveProperty("productPerPage", expect.any(Number));
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });

    it("Should be return data as object", async () => {
      const response = await request(app).get("/pub/products?filter[category]=1,3");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("page", expect.any(Number));
      expect(response.body).toHaveProperty("totalProduct", expect.any(Number));
      expect(response.body).toHaveProperty("totalPage", expect.any(Number));
      expect(response.body).toHaveProperty("productPerPage", expect.any(Number));
      expect(response.body).toHaveProperty("data", expect.any(Object));
    });
    // it("Should be return data as object", async () => {
    //   const response = await request(app).get("/pub/products?page=1");
    //   expect(response.status).toBe(200);
    //   expect(response.body).toBeInstanceOf(Object);
    //   expect(response.body).toHaveProperty("page", expect.any(String));
    //   expect(response.body).toHaveProperty("totalProduct", expect.any(Number));
    //   expect(response.body).toHaveProperty("totalPage", expect.any(Number));
    //   expect(response.body).toHaveProperty("productPerPage", expect.any(Number));
    //   expect(response.body).toHaveProperty("data", expect.any(Object));
    // });
  });
});
