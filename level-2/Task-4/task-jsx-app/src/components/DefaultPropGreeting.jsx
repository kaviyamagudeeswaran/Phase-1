const DefaultPropGreeting = ({ name = "World" }) => {
  return (
    <div className="greeting-box">
      <h2>👋 Hello, {name}!</h2>
    </div>
  );
};

export default DefaultPropGreeting;
