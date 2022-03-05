import React from "react";
import Card from "./Card";

function Cards({ dogs }) {
  return (
    <div>
      {dogs.map((dog) => {
        return <Card data={dog} key={dog.id} />;
      })}
    </div>
  );
}

export default Cards;
