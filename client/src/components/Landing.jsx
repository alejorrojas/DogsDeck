import React from "react";
import { Link } from "react-router-dom";
import landingVideo from "../assets/landingVideo.mp4";
import "../styles/Landing.modulate.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <video
        className="video"
        src={landingVideo}
        controls=""
        muted
        autoPlay={"autoplay"}
        preload="auto"
        loop
      />
      <h1>Find your perfect dog</h1>
      <h3>Start checking and pick your favourites</h3>
      <Link to="/home">
        <button className="home-btn" >HOME</button>
      </Link>
      
    </div>
  );
};

export default Landing;
