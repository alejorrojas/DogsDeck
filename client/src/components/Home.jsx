import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, setLoading } from "../redux/actions";
import load from "../assets/loading.gif";
import Pagination from "./Pagination";
import Cards from "./Cards";
import { Redirect } from "react-router-dom";

function Home() {
  const { allDogs, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    currentPage: 1,
    cardsPerPage: 8,
  });
  const indexLastCard = state.currentPage * state.cardsPerPage;
  const indexFisrtCard = indexLastCard - state.cardsPerPage;
  const currentCards = allDogs?.slice(indexFisrtCard, indexLastCard);

  const paginado = (pagNumber) => {
    setState({ ...state, currentPage: pagNumber });
  };

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      {error ? (
        <Redirect to="*" />
      ) : (
        <>
          {!allDogs.length && (
            <img src={load} alt="loading..." className="loading" />
          )}
          {allDogs.length ? <Cards dogs={currentCards} /> : <div></div>}
          {allDogs.length && (
            <Pagination
              cardsPerPage={state.cardsPerPage}
              allDogs={allDogs.length}
              paginado={paginado}
              active={state.currentPage}
            />
          )}
        </>
      )}
    </>
  );
}

export default Home;
