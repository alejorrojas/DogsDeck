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

const checkNaN = (arr) => {
  return arr.filter((el) => isNaN(parseInt(el))).length;
};

const checkMinMax = (min, max) => {
  const nMax = parseInt(max);
  const nMin = parseInt(min);
  if (nMin > nMax || nMin === nMax) return false;
  return true;
};

const checkNegatives = (arr) => {
  return arr.filter((el) => parseInt(el) < 1).length;
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
    alert("Personaje creado padre");
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
        />
        <div className={styles.tempsContainer} >
          {input.temperament.map((temp) => (
            <div className={styles.tempsSelected}>
              <button name={temp} onClick={handleDelete}>
                X
              </button>
              <p>{temp}</p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <label>Breed</label>
        <input
          type="text"
          value={input.name}
          name="name"
          onChange={handleChange}
        />
        {errors.name && <span className={styles.error}>{errors.name} </span>}

        <label> Height </label>

        <input
          type="number"
          value={input.height_min}
          name="height_min"
          onChange={handleChange}
          placeholder="Min "
        />
        <input
          type="number"
          value={input.height_max}
          name="height_max"
          onChange={handleChange}
          placeholder="Max "
        />

        {errors.height && (
          <span className={styles.error}>{errors.height} </span>
        )}

        <label> Weight </label>

        <input
          type="number"
          value={input.weight_min}
          name="weight_min"
          onChange={handleChange}
          min={input.height_min}
          placeholder="Min "
        />

        <input
          type="number"
          value={input.weight_max}
          name="weight_max"
          onChange={handleChange}
          placeholder="Max "
        />

        {errors.weight && (
          <span className={styles.error}>{errors.weight} </span>
        )}
        <label>Life span</label>

        <input
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
        <label>Image</label>

        <input
          type="url"
          value={input.image}
          name="image"
          onChange={handleChange}
          placeholder="Url "
        />

        <label style={{ fontWeight: "bold" }}>Temperaments: </label>
        <select onChange={handleSelect}>
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
