const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getApiInfo = () => {
  const apiUrl = axios.get("https://api.thedogapi.com/v1/breeds");
  const apiInfo = apiUrl.then((res) =>
    res.data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        temperament: dog.temperament?.split(", "),
        image: dog.image.url,
        weight: dog.weight.metric,
        life_span: dog.life_span,
        height: dog.height.metric,
      };
    })
  );
  return apiInfo;
};

const getDbInfo = () => {
  const dbInfo = Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbInfo.then((res) =>
    res.map((dog) => {
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
    })
  );
};


const getTemperaments = () => {
  const tempsArray = getApiInfo().then((r) => r.map((dog) => dog.temperament));

  const tempsFiltered = tempsArray.then((r) =>
    [...new Set(r.flat())].filter((t) => t !== undefined)
  );
  try {
    tempsFiltered.then((r) =>
      r.forEach((temp) => {
        Temperament.findOrCreate({
          where: { name: temp },
        });
      })
    );
  } catch (e) {
    console.log("entre al catch");
  }

  return Temperament.findAll();
};

const getAllDogs = () => {
  return Promise.all([getDbInfo(), getApiInfo()]).then((r) => r.flat());
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

const checkLimit = (arr, limit) => {
  return arr.filter((el) => el > limit).length;
};

const checkNaN = (arr) => {
  return arr.filter((el) => isNaN(Number(el))).length;
};

const checkMinMax = (min, max) => {
  const nMax = Number(max);
  const nMin = Number(min);
  if (nMin > nMax || nMin === nMax) return false;
  return true;
};
const checkZero = (arr) => {
  return arr.filter((el) => Number(el) === 0).length;
};

const checkNegatives = (arr) => {
  return arr.filter((el) => Number(el) < 0).length;
};

const validate = (input) => {
  const regexName = /^[a-zA-Z ]+$/;
  const { life_span, height_max, height_min, weight_max, weight_min, name } =
    input;
  const numbers = [height_max, height_min, weight_max, weight_min, life_span];
  const errors = {};

  //check undefined
  if (checkUndefined(input)) {
    errors.allFields = "All fields are required";
  }
  //check name
  if (!regexName.test(name)) {
    errors.name = "Invalid name format";
  }
  //check negatives
  if (checkNegatives(numbers)) {
    errors.negatives = "Negative numbers are not valid";
  }
  //check min-max
  if (!checkMinMax(weight_min, weight_max)) {
    errors.weight = "The max must be greater than the min";
  }
  if (!checkMinMax(height_min, height_max)) {
    errors.height = "The max must be greater than the min";
  }
  //check number type
  else if (checkNaN(numbers)) {
    errors.nan = "The weight, height and life span inputs must be a number";
  }
  //check min
  if (checkZero(numbers)) {
    errors.zero = "The value must be greater than zero";
  }
  //check max
  if (checkLimit([weight_min, weight_max], 200)) {
    errors.tooHeavy = "The weight can't be more than 200Kg";
  }
  if (checkLimit([height_min, height_max], 2)) {
    errors.tooTall = "The height can't be more than 2m";
  }
  if (checkLimit([life_span], 30)) {
    errors.tooOld = "The life span can't be more than 30 years";
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
