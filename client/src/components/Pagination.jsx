import React from "react";

function Pagination({ cardsPerPage, allDogs, paginado }) {
  const pagNumbers = [];

  for (let i = 0; i < Math.ceil(allDogs / cardsPerPage); i++) { 
    pagNumbers.push(i + 1);
  }

  return (
    <div>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {pagNumbers &&
          pagNumbers.map((number) => {
            return (
              <button
                onClick={() => paginado(number)}
                style={{
                  padding: "1rem",
                  border: "1px solid #000",
                  borderRadius: "15%",
                  cursor: "pointer",
                }}
                key={number}
              >
                {number}
              </button>
            );
          })}
      </ul>
    </div>
  );
}

export default Pagination;
