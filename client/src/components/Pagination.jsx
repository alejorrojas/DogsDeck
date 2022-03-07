import React from "react";
import styles from "../styles/Pagination.module.css";

function Pagination({ cardsPerPage, allDogs, paginado, active }) {
  const pagNumbers = [];

  for (let i = 0; i < Math.ceil(allDogs / cardsPerPage); i++) {
    pagNumbers.push(i + 1);
  }

  return (
    <div>
      <ul className={styles.ul}>
        {pagNumbers &&
          pagNumbers.map((number) => {
            return (
              <li
                onClick={() => paginado(number)}
                className={active === number ? styles.active : styles.number}
                key={number}
              >
                {number}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Pagination;
