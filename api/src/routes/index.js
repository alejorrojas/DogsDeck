const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//--------------funciones------------------------

const getApiInfo = async () => {
  //Intento de promesa fallida
  //   const apiInfo = [];

  //   axios.get("https://api.thedogapi.com/v1/breeds").then((res) =>
  //     res.data.map((dog) => {
  //       apiInfo.push({
  //         image: dog.image,
  //         name: dog.name,
  //         temperament: dog.temperament,
  //         weight: dog.weight.metric,
  //       });
  //     })
  //   );
  //   return apiInfo;
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiInfo = await apiUrl.data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      temperament: dog.temperament,
      image: dog.image.url,
      weight: dog.weight.metric,
    };
  });
  return apiInfo;
};

const getTemperaments = async () => {
  const allDogs = await getApiInfo();
  const tempsArray = allDogs.map((dog) => dog.temperament?.split(", "));

  const tempsFiltered = [...new Set(tempsArray.flat())];
  console.log(tempsFiltered)

  tempsFiltered.forEach((temp) => {
    Temperament.findOrCreate({
      where: { name: temp },
    });
  });


  const allTemps = await Temperament.findAll();
  return allTemps;
};

//Intento de promesa fallido
// const getDbInfo = () => {
//   const dbInfo = [];

//   Dog.findAll({
//     include: {
//       model: Temperament,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   }).then((res) => (dbInfo = res));
//   return dbInfo;
// };
const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  //no sirve hacer await aca (agregar async, descomentar y ver)
  //  const apiInfo = await getApiInfo()
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();

  return apiInfo.concat(dbInfo);
};

//-----------------------------------------------

router.get("/dogs", async (req, res) => {
  const { name } = req.query;

  const allDogs = await getAllDogs();

  if (name) {
    const dogFind = await allDogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    console.log(dogFind);
    dogFind.length
      ? res.status(200).send(dogFind)
      : res.status(400).send("Sorry, we couldn't find your dog :(");
  } else {
    res.status(200).send(allDogs);
  }
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;

  const allDogs = await getAllDogs();
  const dogFind = id && allDogs.find((dog) => String(dog.id) === id);

  dogFind
    ? res.status(200).json(dogFind)
    : res.status(400).send("Sorry, we couldn't find your dog :(");
});

router.get("/temperament", async (req, res) => {
  // await getTemperaments();
  // const temperaments = await Temperament.findAll();
  // res.status(200).send(temperaments);
  const temps = await getTemperaments();
  res.send(temps);
});

module.exports = router;
