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
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();

  return [...dbInfo, ...apiInfo];
};

/* VALIDATION */
const checkUndefined = (input) => {
  if (!input.temperament.length) return true;
  for (let el in input) {
    if (input[el] === undefined) {
      return true;
    }
    return false;
  }
};

const checkNaN = (arr) => {
  return arr.filter((el) => isNaN(parseInt(el))).length;
};

const checkMinMax = (min, max) => {
  const nMax = parseInt(max);
  const nMin = parseInt(min);
  if (nMax < 1 || nMin < 1) return false;
  if (nMin > nMax || nMin === nMax) return false;
  return true;
};

const validate = (input) => {
  const regexName = /^[a-zA-Z ]+$/;
  const { life_span, height_max, height_min, weight_max, weight_min, name } =
    input;
  const errors = {};
  //check undefined
  if (checkUndefined(input)) {
    errors.allFields = "All fields are required";
  }
  //check name
  if (!regexName.test(name)) {
    errors.name = "Invalid name format";
  }
  //check life-span
  if (parseInt(life_span) < 1)
    errors.life_span = "The life span could not be lower than 1";
  //check min-max
  if (!checkMinMax(weight_min, weight_max)) {
    errors.weight = "The max must be greater than the min";
  }
  if (!checkMinMax(height_min, height_max)) {
    errors.height = "The max must be greater than the min";
  }
  //check number type
  else if (
    checkNaN([height_max, height_min, weight_max, weight_min, life_span])
  ) {
    errors.nan =
      "The weight, height and life span inputs are required and must be a number";
  }

  return errors;
};

module.exports = {
  getAllDogs,
  getTemperaments,
  getDbInfo,
  getApiInfo,
  validate,
};
