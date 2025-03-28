import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="page-container"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>About CityCare Hospital</h1>
      <p>CityCare Hospital has been serving the community for over 25 years.</p>
      <p>
        We offer world-class medical services with highly skilled doctors and
        modern equipment.
      </p>
    </motion.div>
  );
};

export default About;
