import PropTypes from "prop-types";
import "../styles.css"; // Ensure styles are applied

export default function Display({ prevInput, operator, value }) {
  return (
    <div className="display">
      {prevInput} {operator} {value}
    </div>
  );
}

Display.propTypes = {
  prevInput: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.string.isRequired,
};
