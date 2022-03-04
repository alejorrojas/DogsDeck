import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteDog, findId, setLoading } from "../redux/actions";
import load from "../assets/loading.gif";

function Detail() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { detail, loading } = useSelector((state) => state);
  const { name, image, weight, height, temperament, life_span, createdInDb } =
    detail;

  const handleDelete = () => {
    dispatch(deleteDog(id));
    alert("Dog deleted succesfully");
    history.push("/home");
  };

  useEffect(() => {
    dispatch(setLoading());
    dispatch(findId(id));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <img src={load} alt="loading..." />
      ) : (
        <>
          {createdInDb && <button onClick={handleDelete}>Delete</button>}
          <h2>{name} </h2>
          <img
            width="200px"
            height="250px"
            alt="dog img"
            src={
              image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIiPMg_MKr38MbImyVVm6y02fidXaaGiu6D1Pm4-sd_FFQHL_scIJLIcVgki8nf5OQrI&usqp=CAU"
            }
          />
          <h3>Weight</h3>
          <span>{weight} Kg </span>
          <h3>Height</h3>
          <span>{height} m </span>
          <h3>Life Span</h3>
          <span>{life_span} years</span>
          <h3>Temperaments</h3>
          {temperament?.map((temp) => {
            return <span key={temp}>{temp}, </span>;
          })}
          <hr />
          <Link to="/home">
            <button>Home</button>
          </Link>
        </>
      )}
    </div>
  );
}

/**
 * <h2 style={{ textDecoration: "none" }}>{name} </h2>
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
      {temperament?.map((temp) => {
        return <span key={temp} >{temp}, </span>;
      })}
      
 */
export default Detail;
