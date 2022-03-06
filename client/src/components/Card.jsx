import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Card.module.css";

function Card({ data }) {
  const { name, weight, temperament, image, id } = data;

  return (
    <div className={styles.card}>
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
        <h2>{name} </h2>
      </Link>
      <h3>Weight</h3>
      <span>{weight} Kg </span>
      <div className={styles.tempsBox}>
        <h3>Temperaments</h3>
        {temperament?.map((temp) => {
          return <li key={temp}>{temp}, </li>;
        })}
      </div>
    </div>
  );
}

export default Card;
