import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./HomePage.css";
import NavBar from "./NavBar";
import eventifyLogo from "./eventify-logo.png"; // Ensure the logo is in the correct path

const HomePage = () => {
  const [animationPhase, setAnimationPhase] = useState("expand");

  useEffect(() => {
    setTimeout(() => setAnimationPhase("shrink"), 1500); // Start shrinking after 1.5s
  }, []);

  return (
    <div className="blurbg">
    <div className="home-container">

      {animationPhase === "expand" && (
        <motion.div
          className="circle-animation"
          initial={{ scale: 0 }}
          animate={{ scale: 5 }}  // Reduced size from 20 to 8
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      )}

      {animationPhase === "shrink" && (
        <motion.div
          className="circle-animation"
          initial={{ scale: 5 }}
          animate={{ scale: 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          onAnimationComplete={() => setAnimationPhase("done")}
        />
      )}

      {animationPhase === "done" && (
        <>
          <div className="welcome-text">
            <h1>Welcome to Eventify</h1>
            <p>Discover & manage college events in one place!</p>
          </div>
          <img
            src={eventifyLogo}
            alt="Eventify Logo"
            className="eventify-logo"
          />
          <div className="catchy-line">
          <h3>Eventify – Where Every Event Finds It's Audience!</h3>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default HomePage;
