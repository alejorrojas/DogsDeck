import React from "react";
import Card from "./Card";
import styles from '../styles/Cards.module.css'

function Cards({ dogs }) {
  return (
    <div className={styles.cardsContainer} >
      {dogs.map((dog) => {
        return <Card data={dog} key={dog.id} className={styles.card} />;
      })}
    </div>
  );
}

export default Cards;
