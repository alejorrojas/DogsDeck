import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFav } from "../redux/actions";
import styles from "../styles/Card.module.css";

function Card({ data }) {
  const { name, weight, temperament, image, id } = data;
  const dispatch = useDispatch();

  const handleFav = (data) => {
    dispatch(addFav(data));
  };

  return (
    <div className={styles.card}>
      <button onClick={() => handleFav(data)}>+</button>
      <Link to={`/dogs/${id}`} className={styles.link}>
        <img
          width="200px"
          height="250px"
          alt="dog img"
          src={
            image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIiPMg_MKr38MbImyVVm6y02fidXaaGiu6D1Pm4-sd_FFQHL_scIJLIcVgki8nf5OQrI&usqp=CAU"
          }
        />
        <h4 className={styles.title}>{name} </h4>
      </Link>
      <div id={styles.content}>
        <div className={styles.weight}>
          <h3>Weight</h3>
          <span>{weight} Kg </span>
        </div>
        <div className={styles.tempsBox}>
          <h3>Temperaments</h3>
          {temperament?.map((temp) => {
            return <li key={temp}>{temp}</li>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Card;
