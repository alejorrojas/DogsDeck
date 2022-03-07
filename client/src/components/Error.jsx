import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Oops from "../assets/Oops.jpg";
import { setError } from "../redux/actions";

function Error() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setError());
  };

  return (
    <div>
      <h3>Oops, we couldn't finde that one :(</h3>
      <img src={Oops} alt="Oopss..." />
      <Link to="/home">
        <button onClick={handleClick}>Volver</button>
      </Link>
    </div>
  );
}

export default Error;
