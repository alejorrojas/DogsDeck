import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteDog, deleteFav, findId, setLoading } from "../redux/actions";
import load from "../assets/loading.gif";
import Error from "./Error";
import styles from "../styles/Detail.module.css";

function Detail() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { detail, loading, error, favs } = useSelector((state) => state);
  const { name, image, weight, height, temperament, life_span, createdInDb } =
    detail;

  const handleDelete = () => {
    const favDelete = favs.find((dog) => dog.id === id);
    dispatch(deleteDog(id));
    favDelete && dispatch(deleteFav(favDelete));
    alert("Dog deleted succesfully");
    history.push("/home");
  };

  useEffect(() => {
    dispatch(setLoading());
    dispatch(findId(id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {error ? (
        <Error />
      ) : loading ? (
        <img src={load} alt="loading..." className="loading" />
      ) : (
        <>
          <div className={styles.imgBox}>
            <img
              width="200px"
              height="250px"
              alt="dog img"
              src={
                image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIiPMg_MKr38MbImyVVm6y02fidXaaGiu6D1Pm4-sd_FFQHL_scIJLIcVgki8nf5OQrI&usqp=CAU"
              }
            />
            <h1>{name} </h1>
          </div>
          <div className={styles.infoBox}>
            <div>
              <details>
                <summary className={styles.summary}>Temperaments</summary>
                {temperament?.map((temp) => {
                  return <option key={temp}>{temp}</option>;
                })}
              </details>
            </div>
            <div>
              <h3>Weight</h3>
              <span>{weight} Kg </span>
            </div>
            <div>
              <h3>Height</h3>
              <span>{height} m </span>
            </div>
            <div>
              <h3>Life Span</h3>
              <span>{life_span} years</span>
            </div>
            {createdInDb && (
              <button onClick={handleDelete} className={styles.btnDelete}>
                x
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
