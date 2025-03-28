import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Welcome to the Product Search App</h1>
      <p>Find the best products using our advanced search filters!</p>
    </motion.div>
  );
};

export default Home;
