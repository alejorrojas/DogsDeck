import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemps, postDog } from "../redux/actions";

const validate = (input) => {
  let errors = {};
  if (
    input.name === undefined &&
    input.weight_min === undefined &&
    input.weight_max === undefined &&
    input.height_min === undefined &&
    input.height_max === undefined &&
    input.life_span === undefined
  ) {
    errors.allFields =
      "All the fields are required. Only the image is not neccesary";
  } else errors = {};
  return errors;
};

function CharacterCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { temps } = useSelector((state) => state);
  const [errors, setErrors] = useState({
    allFields: "All fields are required",
  });
  const [input, setInput] = useState({
    name: "",
    weight_min: "",
    weight_max: "",
    height_min: "",
    height_max: "",
    image: "",
    life_span: "",
    temperament: [],
  });
  const newDog = {
    name: input.name,
    height: `${input.height_min} - ${input.height_max}`,
    weight: `${input.weight_min} - ${input.weight_max}`,
    life_span: input.life_span,
    image: input.image,
    temperament: input.temperament,
  };

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
    if (input.temperament.length < 5) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    } else alert("You've reached the max amount of temperaments");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(newDog));
    console.log(input);
    alert("Personaje creado padre");
    setInput({
      name: "",
      weight: "",
      height: "",
      life_span: "",
      temperament: [],
    });
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
            min="0.5"
          />
          <label>Max </label>
          <input
            type="number"
            value={input.height_max}
            name="height_max"
            onChange={handleChange}
          />
        </div>
        <div>
          <label> Weight </label>
          <label>Min </label>
          <input
            type="number"
            value={input.weight_min}
            name="weight_min"
            onChange={handleChange}
            min="0"
            step="1"
          />
          <label>Max </label>
          <input
            type="number"
            value={input.weight_max}
            name="weight_max"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Life Span</label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={handleChange}
          />
          {errors.weight && <span>{errors.weight} </span>}
        </div>
        <div>
          <label>Image</label>
          <input
            type="url"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
          {errors.image && <span>{errors.image} </span>}
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

        {errors.allFields ? (
          <button type="submit" disabled={true}>
            Create your dog
          </button>
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
