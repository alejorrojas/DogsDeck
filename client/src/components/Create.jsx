import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemps, postDog } from "../redux/actions";

const validate = (input) => {
  let errors = [];

  !input.name && errors.push({ name: "Se necesita un nombre" });

  return errors;
};

function CharacterCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { temps } = useSelector((state) => state);
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({
    name: "",
    weight: "",
    height: "",
    image: "",
    life_span: "",
    temperament: [],
  });

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
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value],
    });
    console.log(input.temperament);
  };

  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(input));
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
          <label>Height</label>
          <input
            type="text"
            value={input.height}
            name="height"
            onChange={handleChange}
          />
          {errors.height && <span>{errors.height} </span>}
        </div>
        <div>
          <label>Weight</label>
          <input
            type="text"
            value={input.weight}
            name="weight"
            onChange={handleChange}
          />
          {errors.weight && <span>{errors.weight} </span>}
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
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
          {errors.image && <span>{errors.image} </span>}
        </div>

        <label style={{ fontWeight: "bold" }}>Temperaments: </label>
        <select onChange={handleSelect}>
          {temps.map((temp) => {
            return <option value={temp.name}>{temp.name} </option>;
          })}
        </select>
        <hr />

        {!input.name ? (
          <button type="submit" disabled={true}>
            Create your dog
          </button>
        ) : (
          <button type="submit">Create your dog</button>
        )}
      </form>

      {input.temperament.map((temp) => (
        <div>
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
