import React from "react";
import styles from "../styles/Slider.module.css";
import slider8 from "../assets/slider8.jpg";
import slider2 from "../assets/slider2.jpg";
import slider3 from "../assets/slider3.jpg";
import slider6 from "../assets/slider6.jpg";

function Slider() {
  return (
    <div className={styles.slider}>
      <figure>
        <img src={slider6} alt='dog slide 1'/>
        <img src={slider2}alt='dog slide 2' />
        <img src={slider3} alt='dog slide 3'/>
        <img src={slider8} alt='dog slide 4'/>
        <img src={slider6} alt='dog slide 5'/>
      </figure>
    </div>
  );
}

export default Slider;
