const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Apolo",
  weight_min: "10",
  weight_max: "25",
  height_min: "1",
  height_max: "2",
  image:
    "https://images.pexels.com/photos/4422100/pexels-photo-4422100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  life_span: "18",
  temperament: ["Playful"],
};

describe("Dogs routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
});

describe("GET methods", () => {
  it("/dogs should get all dogs", () =>
    agent
      .get("/dogs")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.have.length(172);
      }));

  it("/temperaments should get all temperaments", function () {
    agent
      .get("/temperaments")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.have.length(124);
      });
  });
});
