import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterApi,
  filterDb,
  filterTemp,
  getDogs,
  getTemps,
  setLoading,
} from "../redux/actions";
import Card from "./Card";
import SearchBar from "./SearchBar";
import load from "../assets/loading.gif";
import Pagination from "./Pagination";

function Home() {
  const allDogs = useSelector((state) => state.allDogs);
  const { loading, temps } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardPerPage] = useState(8);
  const indexLastCard = currentPage * cardsPerPage;
  const indexFisrtCard = indexLastCard - cardsPerPage;
  console.log(allDogs);
  const currentCards = allDogs?.slice(indexFisrtCard, indexLastCard);

  const paginado = (pagNumber) => {
    setCurrentPage(pagNumber);
  };
  const handleChange = (e) => {
    switch (e.target.value) {
      case "created":
        dispatch(filterDb());
        break;
      case "api":
        dispatch(filterApi());
        break;
      case "default":
        dispatch(getDogs());
        break;

      default:
        dispatch(filterTemp(e.target.value));
        break;
    }
  };
  const handleRefresh = () => {
    dispatch(setLoading());
    dispatch(getDogs());
  };

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getDogs());
    dispatch(getTemps());
  }, [dispatch]);

  return (
    <>
      <h1>HOME PEREREQUE</h1>
      <SearchBar />
      <Link to="/dog">
        <button>create</button>
      </Link>
      <br />
      <button onClick={handleRefresh}>Refresh</button>
      <br />
      <div>
        <label>Order by </label>
        <select onChange={handleChange}>
          <option value="default">Default</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Moreweight">+ Weight</option>
          <option value="Lessheight">- Wheight</option>
        </select>
      </div>
      <div>
        <label>Filter by temperaments </label>
        <select onChange={handleChange}>
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
        <select onChange={handleChange}>
          <option value="default">Default</option>
          <option value="created">Created</option>
          <option value="api">Existentes</option>
        </select>
      </div>
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
          cardsPerPage={cardsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      )}
    </>
  );
}

export default Home;
