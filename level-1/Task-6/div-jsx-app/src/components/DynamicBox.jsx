const DynamicBox = ({ bgColor, text }) => {
  const boxStyle = {
    backgroundColor: bgColor || "lightgray", // Default color
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "60%",
    maxWidth: "600px",
    margin: "20px auto", // Added margin for spacing
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white",
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
  };

  return <div style={boxStyle}>{text}</div>;
};

export default DynamicBox;
