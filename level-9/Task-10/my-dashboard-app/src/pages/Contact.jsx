import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      className="page-container"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Contact Us</h1>
      <p>
        <strong>Address:</strong> 123 Healthcare Avenue, Metro City
      </p>
      <p>
        <strong>Phone:</strong> +1 (555) 123-4567
      </p>
      <p>
        <strong>Email:</strong> support@citycarehospital.com
      </p>
    </motion.div>
  );
};

export default Contact;
