import React from "react";
import styles from "../styles/Pagination.module.css";

function Pagination({ cardsPerPage, allDogs, paginado, current }) {
  const pagNumbers = [];

  for (let i = 0; i < Math.ceil(allDogs / cardsPerPage); i++) {
    pagNumbers.push(i + 1);
  }

  return (
    <div>
      <div className={styles.pagination}>
        {current !== 1 && (
          <button onClick={() => paginado(current - 1)} className={styles.prev}>
            +
          </button>
        )}
        <span>{current}</span>
        {current !== pagNumbers.at(-1) && (
          <button onClick={() => paginado(current + 1)} className={styles.next}>
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
