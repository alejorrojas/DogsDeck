import React from "react";
import styles from "../styles/Landing.module.css";
import Slider from "./Slider";

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <Slider />
    </div>
  );
};

export default Landing;
