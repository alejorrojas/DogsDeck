import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Cards from "./Cards";

function Favoritos() {
  const { favs } = useSelector((state) => state);

  return (
    <>
      <Cards dogs={favs} />
    </>
  );
}

export default Favoritos;
