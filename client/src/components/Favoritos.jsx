import React from "react";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import styles from "../styles/Fav.module.css";

function Favoritos() {
  const { favs } = useSelector((state) => state);

  return (
    <>
      {favs.length ? (
        <Cards dogs={favs} />
      ) : (
        <h1 className={styles.title}>
          Start adding your dogs and see them here!
        </h1>
      )}
    </>
  );
}

export default Favoritos;
