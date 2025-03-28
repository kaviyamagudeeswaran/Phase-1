import PropTypes from "prop-types";

export default function Buttons({ onButtonClick }) {
  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    "C",
    "=",
    "+",
  ];

  return (
    <div className="buttons">
      {buttons.map((btn) => (
        <button key={btn} onClick={() => onButtonClick(btn)}>
          {btn}
        </button>
      ))}
    </div>
  );
}

Buttons.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};
