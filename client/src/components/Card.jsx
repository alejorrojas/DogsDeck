import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFav, deleteFav } from "../redux/actions";
import styles from "../styles/Card.module.css";

function Card({ data }) {
  const { favs } = useSelector((state) => state);
  const { name, weight, temperament, image, id } = data;
  const dispatch = useDispatch();
  const active = favs.find((dog => dog.id === data.id))

  const handleFav = (data) => {
    const included = favs.filter((dog) => dog.id === data.id);
    included.length && dispatch(deleteFav(data));
    !included.length && dispatch(addFav(data));
   
  };

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
      </Link>
      <div className={styles.headerCard}>
        <button
          onClick={() => handleFav(data)}
          className={active ? styles.favActive : styles.fav}
        >
          +
        </button>
        <h2 className={styles.title}>{name} </h2>
      </div>

      <div className={styles.content}>
        <div className={styles.weight}>
          <h4>Weight</h4>
          <span>{weight} Kg </span>
        </div>
        <div className={styles.tempsBox}>
          <details className={styles.detail} >
            <summary>Temperaments</summary>
            {temperament?.map((temp) => {
              return <option key={temp}>{temp}</option>;
            })}
          </details>
        </div>
      </div>
    </div>
  );
}

export default Card;
