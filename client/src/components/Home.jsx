import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../redux/actions";
import Card from "./Card";

const Home = () => {
  const { allDogs, loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <>
      <h1>HOME PEREREQUE</h1>;
      {allDogs &&
        allDogs.map((dog) => {
          return (
            <div key={dog.id}>
              <Card props={dog} />
            </div>
          );
        })}
    </>
  );
};

export default Home;
