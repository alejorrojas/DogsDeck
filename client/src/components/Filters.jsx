import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClear } from "../redux/actions";
import {
  filterApi,
  filterDb,
  filterTemp,
  getDogs,
  orderName,
  orderWeight,
} from "../redux/actions";
import styles from "../styles/Filters.module.css";

function Filters() {
  const temps = useSelector((state) => state.temps);
  const dispatch = useDispatch();
  const [state, setState] = useState({ alreadyFiltered: false });

  const handleChange = (e) => {
    const { value } = e.target;
    switch (value) {
      case "moreheight":
        dispatch(orderWeight(value));
        break;
      case "lessheight":
        dispatch(orderWeight(value));
        break;
      case "lessweight":
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
    dispatch(setClear());
    setState({ ...state, alreadyFiltered: false, currentPage: 1 });
  };

  useEffect(() => {
    setState({ ...state, alreadyFiltered: false });
  }, [dispatch]);

  return (
    <form onSubmit={(e) => e.reset()} className={styles.filterBox}>
      <button onClick={handleRefresh} className={styles.btn}>
        clear
      </button>
      <div>
        <select
          disabled={!state.alreadyFiltered ? false : true}
          onChange={handleChange}
        >
          <option value="default">Order</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="moreweight">+ Weight</option>
          <option value="lessweight">- Wheight</option>
          <option value="moreheight">+ Height</option>
          <option value="lessheight">- Height</option>
        </select>
      </div>
      <div>
        <select
          disabled={!state.alreadyFiltered ? false : true}
          onChange={handleChange}
        >
          <option value="default">Filter</option>
          <option value="created">Created</option>
          <option value="api">Web</option>
        </select>
      </div>
      <div>
        <select
          disabled={!state.alreadyFiltered ? false : true}
          onChange={handleChange}
        >
          <option value="default">Temperaments</option>
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
    </form>
  );
}

export default Filters;
