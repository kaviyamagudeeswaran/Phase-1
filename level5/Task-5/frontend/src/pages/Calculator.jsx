import { useState } from "react";
import Display from "../components/Display";
import Buttons from "../components/Buttons";
import "../styles.css";

export default function Calculator() {
  const [input, setInput] = useState(""); // Current number input
  const [prevInput, setPrevInput] = useState(""); // Store first operand
  const [operator, setOperator] = useState(""); // Store operator
  const [result, setResult] = useState(""); // Store result

  const handleButtonClick = (btn) => {
    if (!isNaN(btn) || btn === ".") {
      setInput((prev) => prev + btn);
    } else if (btn === "C") {
      setInput("");
      setPrevInput("");
      setOperator("");
      setResult("");
    } else if (btn === "=") {
      if (prevInput !== "" && operator !== "" && input !== "") {
        calculateResult();
      }
    } else {
      if (input === "" && result !== "") {
        setPrevInput(result);
      } else {
        setPrevInput(input);
      }
      setOperator(btn);
      setInput("");
    }
  };

  const calculateResult = () => {
    if (prevInput === "" || operator === "" || input === "") return;

    const num1 = parseFloat(prevInput);
    const num2 = parseFloat(input);
    let newResult = "";

    switch (operator) {
      case "+":
        newResult = num1 + num2;
        break;
      case "-":
        newResult = num1 - num2;
        break;
      case "*":
        newResult = num1 * num2;
        break;
      case "/":
        newResult = num2 !== 0 ? num1 / num2 : "Error";
        break;
      default:
        newResult = num2;
    }

    setInput(newResult.toString());
    setPrevInput(prevInput + " " + operator + " " + input + " =");
    setOperator("");
    setResult(newResult.toString());
  };

  return (
    <div className="calculator">
      <Display
        prevInput={prevInput}
        operator={operator}
        value={input || result || "0"}
      />
      <Buttons onButtonClick={handleButtonClick} />
    </div>
  );
}
