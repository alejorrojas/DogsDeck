import React from "react";
import { Link } from "react-router-dom";

function Card({ props }) {
  const { name, weight, temperament, image, id } = props;
  console.log(props);
  return (
    <div>
      <Link to={`/dog/${id}`}>
        <h2 style={{ textDecoration: "none" }}>{name} </h2>
        <img
          width="200px"
          height="250px"
          alt="dog img"
          src={
            image
              ? image
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIiPMg_MKr38MbImyVVm6y02fidXaaGiu6D1Pm4-sd_FFQHL_scIJLIcVgki8nf5OQrI&usqp=CAU"
          }
        />
      </Link>
      <h3>Weight</h3>
      <span>{weight} Kg </span>
      <h3>Temperaments</h3>
      <span>{temperament} </span>
    </div>
  );
}

export default Card;
