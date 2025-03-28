import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Welcome to CityCare Hospital</h1>
      <p>Providing quality healthcare with state-of-the-art facilities.</p>
      <p>
        Our hospital specializes in emergency care, surgery, and advanced
        treatments.
      </p>
    </motion.div>
  );
};

export default Home;
