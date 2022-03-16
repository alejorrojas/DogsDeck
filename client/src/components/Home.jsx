import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemps, setLoading } from "../redux/actions";
import load from "../assets/loading.gif";
import Pagination from "./Pagination";
import Cards from "./Cards";
import { Redirect } from "react-router-dom";
import Slider from "./Slider";

function Home() {
  const { allDogs, error, loading } = useSelector((state) => state);
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
    dispatch(getTemps());
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      {error ? (
        <Redirect to="*" />
      ) : (
        <>
          {loading && (
            <div className="loading">
              <img src={load} alt="loading..." />
            </div>
          )}
          {/* <Slider/> */}
          {allDogs.length ? <Cards dogs={currentCards} /> : <div></div>}
          {allDogs.length > 0 && (
            <footer>
              <Pagination
                cardsPerPage={state.cardsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                current={state.currentPage}
              />
            </footer>
          )}
        </>
      )}
    </>
  );
}

export default Home;
