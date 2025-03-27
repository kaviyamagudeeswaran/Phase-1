const UserDetails = ({ name, age, city }) => {
  return (
    <div className="user-box">
      <h2>👤 User Details</h2>
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

export default UserDetails;
