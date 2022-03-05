import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterApi,
  filterDb,
  filterTemp,
  getDogs,
  getTemps,
  orderName,
  orderWeight,
  setLoading,
} from "../redux/actions";
import Card from "./Card";
import SearchBar from "./SearchBar";
import load from "../assets/loading.gif";
import Pagination from "./Pagination";
import Error from "./Error";

function Home() {
  const { allDogs, loading, temps, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    currentPage: 1,
    cardsPerPage: 8,
    alreadyFiltered: false,
  });
  const indexLastCard = state.currentPage * state.cardsPerPage;
  const indexFisrtCard = indexLastCard - state.cardsPerPage;
  const currentCards = allDogs?.slice(indexFisrtCard, indexLastCard);

  const paginado = (pagNumber) => {
    setState({ ...state, currentPage: pagNumber });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    switch (value) {
      case "lessheight":
        dispatch(orderWeight(value));
        break;
      case "moreweight":
        dispatch(orderWeight(value));
        break;
      case "created":
        dispatch(filterDb());
        break;
      case "api":
        dispatch(filterApi());
        break;
      case "default":
        dispatch(getDogs());
        break;
      case "A-Z":
        dispatch(orderName(value));
        break;
      case "Z-A":
        dispatch(orderName(value));
        break;

      default:
        dispatch(filterTemp(value));
        break;
    }
    setState({ ...state, alreadyFiltered: true, currentPage: 1 });
  };
  const handleRefresh = () => {
    dispatch(setLoading());
    dispatch(getDogs());
    setState({ ...state, alreadyFiltered: false, currentPage: 1 });
  };

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getDogs());
    dispatch(getTemps());
    setState({ ...state, alreadyFiltered: false });
  }, [dispatch]);

  return (
    <>
      <h1>HOME PEREREQUE</h1>
      <SearchBar />
      <Link to="/dog">
        <button>create</button>
      </Link>
      <br />
      <br />
      <form onSubmit={(e) => e.reset()}>
        <button onClick={handleRefresh}>Refresh</button>
        <div>
          <label>Order by </label>
          <select
            disabled={!state.alreadyFiltered ? false : true}
            onChange={handleChange}
          >
            <option value="default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="moreweight">+ Weight</option>
            <option value="lessheight">- Wheight</option>
          </select>
        </div>
        <div>
          <label>Filter by temperaments </label>
          <select
            disabled={!state.alreadyFiltered ? false : true}
            onChange={handleChange}
          >
            <option value="default">Default</option>
            {temps &&
              temps.map((t) => {
                return (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <label>Filter by origin </label>
          <select
            disabled={!state.alreadyFiltered ? false : true}
            onChange={handleChange}
          >
            <option value="default">Default</option>
            <option value="created">Created</option>
            <option value="api">Web</option>
          </select>
        </div>
      </form>
      {error ? (
        <Error />
      ) : (
        <>
          {loading ? (
            <img src={load} alt="loading..." />
          ) : (
            allDogs.length &&
            currentCards.map((dog) => {
              return (
                <div key={dog.id}>
                  <Card data={dog} />
                </div>
              );
            })
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
