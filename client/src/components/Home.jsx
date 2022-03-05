import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, setLoading } from "../redux/actions";
import SearchBar from "./SearchBar";
import load from "../assets/loading.gif";
import Pagination from "./Pagination";
import Error from "./Error";
import Cards from "./Cards";
import Filters from "./Filters";

function Home() {
  const { allDogs, loading, error } = useSelector((state) => state);
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
      <h1>HOME PEREREQUE</h1>
      <SearchBar />
      <Link to="/dog">
        <button>create</button>
      </Link>
      <Filters />
      {error ? (
        <Error />
      ) : (
        <>
          {loading ? (
            <img src={load} alt="loading..." />
          ) : (
            allDogs.length && <Cards dogs={currentCards} />
          )}
          {loading || (
            <Pagination
              cardsPerPage={state.cardsPerPage}
              allDogs={allDogs.length}
              paginado={paginado}
            />
          )}
        </>
      )}
    </>
  );
}

export default Home;
