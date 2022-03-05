const { Dog, Temperament } = require("../db");
const {
  getTemperaments,
  getAllDogs,
  getDbInfo,
  getApiInfo,
} = require("../services");
const controller = {};

controller.dogs = async (req, res) => {
  const { name } = req.query;

  const allDogs = await getAllDogs();

  if (name) {
    const dogFind = allDogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );

    dogFind.length
      ? res.status(200).send(dogFind)
      : res.status(400).send("Sorry, we couldn't find your dog :(");
  } else {
    res.status(200).send(allDogs);
  }
};

controller.dogsId = async (req, res) => {
  const { id } = req.params;

  const allDogs = await getAllDogs();
  const dogFind = id && allDogs.find((dog) => String(dog.id) === id);
  console.log(dogFind);
  dogFind
    ? res.status(200).json(dogFind)
    : res.status(400).send("Sorry, we couldn't find your dog :(");
};

controller.temperaments = async (req, res) => {
  const temps = await getTemperaments();
  res.send(temps);
};

controller.dogPost = async (req, res) => {
  const { name, weight, height, life_span, temperament, image } = req.body;

  try {
    const newDog = await Dog.create({
      name,
      weight,
      image,
      height,
      life_span,
    });

    const tempDb = await Temperament.findAll({
      where: { name: temperament },
    });

    newDog.addTemperament(tempDb);

    res.send("Dog created! :)");
  } catch (e) {
    res.send("Something is wrong :S", e);
  }
};

controller.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const findDog = await Dog.findByPk(id);
    findDog.destroy();
    res.send(200, "Dog deleted succesfully");
  } catch (e) {
    res.send("Something is wrong :S", e);
  }
};

controller.filterCreated = async (req, res) => {
  try {
    const dbInfo = await getDbInfo();
    console.log(dbInfo);
    res.status(200).send(dbInfo);
  } catch (e) {
    res.send("Something is wrong :S", e);
  }
};

controller.api = async (req, res) => {
  try {
    const apiInfo = await getApiInfo();

    res.status(200).send(apiInfo);
  } catch (e) {
    res.send("Something is wrong :S", e);
  }
};
module.exports = controller;
