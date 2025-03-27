import PropTypes from "prop-types";

const UserInfo = ({ name, age, city }) => {
  return (
    <div className="user-box">
      <h2>👤 User Info</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>City:</strong> {city}
      </p>
    </div>
  );
};

// PropTypes validation
UserInfo.propTypes = {
  name: PropTypes.string.isRequired, // Name must be a string
  age: PropTypes.number.isRequired, // Age must be a number
  city: PropTypes.string.isRequired, // City must be a string
};

// Default Props (if no values are provided)
UserInfo.defaultProps = {
  name: "Unknown",
  age: 18,
  city: "Not Specified",
};

export default UserInfo;
