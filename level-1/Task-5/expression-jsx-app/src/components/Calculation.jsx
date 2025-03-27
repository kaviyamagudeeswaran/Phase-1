import "./../index.css"; // Import global styles

const Calculation = () => {
  const num1 = 10;
  const num2 = 5;
  const result = num1 * num2; // Perform a calculation

  return (
    <div className="calculation-container">
      <h3>Calculation Result</h3>
      <p>
        {num1} × {num2} = {result}
      </p>
    </div>
  );
};

export default Calculation;
