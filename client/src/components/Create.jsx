import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTemps, postDog } from "../redux/actions";
import styles from "../styles/Create.module.css";

const checkUndefined = (input) => {
  if (!input.temperament.length) return true;
  for (let el in input) {
    if (input[el] === undefined) {
      return true;
    }
    return false;
  }
};

const checkZero = (arr) => {
  return arr.find((el) => Number(el) === 0);
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

const checkNegatives = (arr) => {
  return arr.filter((el) => Number(el) < 0).length;
};

const validate = (input) => {
  const regexUrl =
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
  const regexName = /^[a-zA-Z ]+$/;
  const {
    life_span,
    height_max,
    height_min,
    weight_max,
    weight_min,
    name,
    image,
  } = input;
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
  if (!regexUrl.test(image)) {
    errors.url = "Only jpg, jpeg, and png urls are allowed";
  }

  return errors;
};

function CharacterCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { temps } = useSelector((state) => state);
  const initialState = {
    name: "",
    weight_min: "",
    weight_max: "",
    height_min: "",
    height_max: "",
    image: "",
    life_span: "",
    temperament: [],
  };
  const [errors, setErrors] = useState({
    allFields: "All fields are required",
  });
  const [input, setInput] = useState(initialState);

  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((c) => c !== e.target.name),
    });
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    if (input.temperament.includes(value))
      return alert("You've already selected that temperament");
    if (input.temperament.length < 5) {
      setInput({
        ...input,
        temperament: [...input.temperament, value],
      });
      setErrors(
        validate({
          ...input,
          temperament: [...input.temperament, value],
        })
      );
    } else alert("You've reached the max amount of temperaments");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(input));
    console.log(input);
    alert("Dog created successfully");
    setInput(initialState);
    history.push("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className={styles.title}>Create your own dog</h1>
        <img
          src={
            input.image.length
              ? input.image
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIiPMg_MKr38MbImyVVm6y02fidXaaGiu6D1Pm4-sd_FFQHL_scIJLIcVgki8nf5OQrI&usqp=CAU"
          }
          alt="dog profile"
        />
        <div className={styles.tempsContainer}>
          {input.temperament.map((temp) => (
            <div className={styles.tempsSelected} key={temp}>
              <button name={temp} onClick={handleDelete}>
                X
              </button>
              <p>{temp}</p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <label htmlFor="nameInput">Name</label>
        <input
          id="nameInput"
          type="text"
          value={input.name}
          name="name"
          onChange={handleChange}
        />
        {errors.name && <span className={styles.error}>{errors.name} </span>}

        <label htmlFor="heightInput">Height</label>

        <input
          id="heightInput"
          type="number"
          value={input.height_min}
          name="height_min"
          onChange={handleChange}
          placeholder="Min "
        />
        <input
          id="heightInput"
          type="number"
          value={input.height_max}
          name="height_max"
          onChange={handleChange}
          placeholder="Max "
        />

        {errors.height && (
          <span className={styles.error}>{errors.height} </span>
        )}
        {errors.tooTall && (
          <span className={styles.error}>{errors.tooTall} </span>
        )}

        <label htmlFor="weightInput">Weight</label>

        <input
          id="weightInput"
          type="number"
          value={input.weight_min}
          name="weight_min"
          onChange={handleChange}
          placeholder="Min "
        />

        <input
          id="weightInput"
          type="number"
          value={input.weight_max}
          name="weight_max"
          onChange={handleChange}
          placeholder="Max "
        />

        {errors.weight && (
          <span className={styles.error}>{errors.weight} </span>
        )}
        {errors.tooHeavy && (
          <span className={styles.error}>{errors.tooHeavy} </span>
        )}
        <label htmlFor="lifeInput">Life span</label>

        <input
          id="lifeInput"
          type="number"
          value={input.life_span}
          name="life_span"
          onChange={handleChange}
          placeholder="Life Span"
        />

        {errors.negatives && (
          <span className={styles.error}>{errors.negatives}</span>
        )}
        {errors.nan && <span className={styles.error}>{errors.nan} </span>}
        {errors.tooOld && (
          <span className={styles.error}>{errors.tooOld} </span>
        )}
        {errors.zero && <span className={styles.error}>{errors.zero} </span>}
        <label htmlFor="imageInput">Image</label>

        <input
          id="imageInput"
          type="url"
          value={input.image}
          name="image"
          onChange={handleChange}
          placeholder="Url "
        />
        {errors.url && <span className={styles.error}>{errors.url} </span>}
        <label htmlFor="tempsInput">Temperaments</label>
        <select id="tempsInput" onChange={handleSelect}>
          {!input.temperament.length ? (
            <option>Select Temperament</option>
          ) : (
            <option disabled={true}>Select Temperament</option>
          )}

          {temps.map((temp) => {
            return (
              <option key={temp.name} value={temp.name}>
                {temp.name}{" "}
              </option>
            );
          })}
        </select>
        {Object.keys(errors).length ? (
          <div>
            <button type="submit" disabled={true} className={styles.btn}>
              Create
            </button>
          </div>
        ) : (
          <button type="submit" className={styles.btn}>
            Create
          </button>
        )}
      </form>
    </div>
  );
}

export default CharacterCreate;
