import React, { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import "../styles.css"; // Import the CSS file

const Loader = () => {
  const { loading } = useContext(LoadingContext);

  return loading ? <div className="loader-container">Loading...</div> : null;
};

export default Loader;
