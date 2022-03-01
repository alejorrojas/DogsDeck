import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, setLoading } from "../redux/actions";
import Card from "./Card";
import SearchBar from "./SearchBar";
import load from "../assets/loading.gif";

const Home = () => {
  const { allDogs, loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      <h1>HOME PEREREQUE</h1>
      <SearchBar />
      <Link to='/dog'>
        <button>create</button>
      </Link>
      {loading ? (
        <img src={load} alt="loading..." />
      ) : (
        allDogs.length &&
        allDogs.map((dog) => {
          return (
            <div key={dog.id}>
              <Card data={dog} />
            </div>
          );
        })
      )}
    </>
  );
};

export default Home;
