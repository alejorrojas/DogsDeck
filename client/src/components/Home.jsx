import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../redux/actions";
import Card from "./Card";
import SearchBar from "./SearchBar";

const Home = () => {
  const { allDogs, loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      <h1>HOME PEREREQUE</h1>
      <SearchBar/>
      {allDogs &&
        allDogs.map((dog) => {
          return (
            <div key={dog.id}>
              <Card data={dog} />
            </div>
          );
        })}
    </>
  );
};

export default Home;
