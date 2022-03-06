import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function Filters() {
  const temps = useSelector((state) => state.temps);
  const dispatch = useDispatch();
  const [state, setState] = useState({ alreadyFiltered: false });

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
    dispatch(getTemps());
    setState({ ...state, alreadyFiltered: false });
  }, [dispatch]);

  return (
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
  );
}

export default Filters;
