import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from '../styles/Error.module.css'
import Oops from "../assets/Oops.jpg";
import { setError } from "../redux/actions";

function Error() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setError());
  };

  return (
    <div className={styles.errorBox} >
      <h1>Oops, we couldn't finde that one :(</h1>
      <img src={Oops} alt="Oopss..." />
      <Link to="/home">
        <button onClick={handleClick} className={styles.btn} >Home</button>
      </Link>
    </div>
  );
}

export default Error;
