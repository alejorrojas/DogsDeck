import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { findDogs, setLoading } from "../redux/actions";
import styles from "../styles/Nav.module.css";
import searchIcon from "../assets/searchIcon.svg";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading());
    dispatch(findDogs(input));
    setInput("");
    history.push("/home");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search..."
        className={styles.searchData}
      />
      <button type="submit" className={styles.search}>
        +
      </button>
    </form>
  );
}

export default SearchBar;
