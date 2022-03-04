import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setError } from "../redux/actions";

function Error() {


  return (
    <div>
      <h3>Sorry, something went wrong</h3>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}

export default Error;
