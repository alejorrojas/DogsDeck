const { Dog, Temperament } = require("../db");
const {
  getTemperaments,
  getAllDogs,
  getDbInfo,
  getApiInfo,
  validate,
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
  const {
    name,
    weight_min,
    weight_max,
    height_min,
    height_max,
    life_span,
    temperament,
    image,
  } = req.body;

  const errors = validate(req.body);
  if (Object.keys(errors).length)
    res.send("Check again your dog info before create");
  else {
    const dogFormat = {
      name,
      height: `${height_min} - ${height_max}`,
      weight: `${weight_min} - ${weight_max}`,
      life_span,
      image,
    };

    try {
      const tempDb = await Temperament.findAll({
        where: { name: temperament },
      });
      if (!tempDb.length) {
        return res.send(400, "Sorry, we could not find that temperament");
      } else {
        const newDog = await Dog.create(dogFormat);
        newDog.addTemperament(tempDb);
        res.send("Dog created! :)");
      }
    } catch (e) {
      res.send("Something is wrong :S", e);
    }
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

controller.filterApi = async (req, res) => {
  try {
    const apiInfo = await getApiInfo();

    res.status(200).send(apiInfo);
  } catch (e) {
    res.send("Something is wrong :S", e);
  }
};
module.exports = controller;
