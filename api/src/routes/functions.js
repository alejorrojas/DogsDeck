const axios = require("axios");
const { Dog, Temperament } = require("../db");

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
      temperament: dog.temperament?.split(", "),
      image: dog.image.url,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      height: dog.height.metric,
    };
  });
  return apiInfo;
};
const getDbInfo = async () => {
  const dbInfo = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const dbFormat = dbInfo.map((dog) => {
    console.log(dog);
    const {
      id,
      name,
      Temperaments,
      image,
      weight,
      height,
      life_span,
      createdInDb,
    } = dog;
    const dogFormat = {
      id,
      name,
      temperament: Temperaments.map((t) => t.name),
      image,
      weight,
      height,
      life_span,
      createdInDb,
    };
    return dogFormat;
  });
  return dbFormat;
};

const getTemperaments = async () => {
  const allDogs = await getApiInfo();
  const tempsArray = allDogs.map((dog) => dog.temperament);

  const tempsFiltered = [...new Set(tempsArray.flat())];

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

const getAllDogs = async () => {
  //no sirve hacer await aca (agregar async, descomentar y ver)
  //  const apiInfo = await getApiInfo()
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();

  return [...dbInfo, ...apiInfo];
};

module.exports = {
  getAllDogs,
  getTemperaments,
  getDbInfo,
  getApiInfo,
};
