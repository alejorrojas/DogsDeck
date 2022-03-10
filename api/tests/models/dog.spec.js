const { Dog, conn } = require("../../src/db.js");

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

describe("Dog model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("Correct post", () => {
      it("should throw an error if name is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should throw an error if weight values aren't a number", (done) => {
        Dog.create({
          name: "Apolo",
          weight_min: NaN,
          weight_max: NaN,
          height_min: "1",
          height_max: "2",
          image:
            "https://images.pexels.com/photos/4422100/pexels-photo-4422100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          life_span: "18",
          temperament: ["Playful"],
        })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should throw an error if height values aren't a number", (done) => {
        Dog.create({
          name: "Apolo",
          weight_min: "1",
          weight_max: "2",
          height_min: NaN,
          height_max: NaN,
          image:
            "https://images.pexels.com/photos/4422100/pexels-photo-4422100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          life_span: "18",
          temperament: ["Playful"],
        })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should throw an error if life span values aren't a number", (done) => {
        Dog.create({
          name: "Apolo",
          weight_min: "1",
          weight_max: "2",
          height_min: "1",
          height_max: "2",
          image:
            "https://images.pexels.com/photos/4422100/pexels-photo-4422100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          life_span: NaN,
          temperament: ["Playful"],
        })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });

      it("should work when its a valid info", () => {
        Dog.create(dog);
      });
    });
  });
});
