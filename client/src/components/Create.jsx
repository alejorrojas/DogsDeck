import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemps, postDog } from "../redux/actions";

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
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <h1>Crea tu personaje</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Breed</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name} </span>}
        </div>
        <div>
          <label> Height </label>
          <label>Min </label>
          <input
            type="number"
            value={input.height_min}
            name="height_min"
            onChange={handleChange}
          />
          <label>Max </label>
          <input
            type="number"
            value={input.height_max}
            name="height_max"
            onChange={handleChange}
          />
        </div>
        {errors.height && <span>{errors.height} </span>}
        <div>
          <label> Weight </label>
          <label>Min </label>
          <input
            type="number"
            value={input.weight_min}
            name="weight_min"
            onChange={handleChange}
            min={input.height_min}
          />
          <label>Max </label>
          <input
            type="number"
            value={input.weight_max}
            name="weight_max"
            onChange={handleChange}
          />
        </div>
        {errors.weight && <span>{errors.weight} </span>}
        <div>
          <label>Life Span</label>
          <input
            type="number"
            value={input.life_span}
            name="life_span"
            onChange={handleChange}
          />
        </div>
        {errors.negatives && <span>{errors.negatives}</span>}
        {errors.nan && <span>{errors.nan} </span>}
        <div>
          <label>Image</label>
          <input
            type="url"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
        </div>

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
        <hr />
        {console.log(errors)}
        {Object.keys(errors).length ? (
          <div>
            <button type="submit" disabled={true}>
              Create your dog
            </button>
          </div>
        ) : (
          <button type="submit">Create your dog</button>
        )}
      </form>

      {input.temperament.map((temp) => (
        <div key={`add${temp}`}>
          <p>{temp}</p>
          <button name={temp} onClick={handleDelete}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default CharacterCreate;
