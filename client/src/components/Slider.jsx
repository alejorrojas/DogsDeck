import React from "react";
import styles from "../styles/Slider.module.css";
import slider3 from "../assets/slider3.jpg";
import slider6 from "../assets/slider6.jpg";
import slider10 from "../assets/slider10.jpg";
import backLanding from "../assets/backLanding.jpg";
import { Link } from "react-router-dom";

function Slider() {
  return (
    <div className={styles.slider}>
      <figure>
        <img src={backLanding} alt="dog slide 1" />
        <img src={slider3} alt="dog slide 2" />
        <img src={slider6} alt="dog slide 3" />
        <img src={slider10} alt="dog slide 4" />
        <img src={backLanding} alt="dog slide 5" />
      </figure>
      <div className={styles.landingContainer}>
        <h1>Find your perfect dog</h1>
        <h3>Start checking and pick your favourites</h3>
        <Link to="/home">
          <button className={styles.homeBtn}>HOME</button>
        </Link>
      </div>
    </div>
  );
}

export default Slider;
