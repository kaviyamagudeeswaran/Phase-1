const Greeting = ({ isLoggedIn }) => {
  return (
    <div className="greeting-box">
      <h2>{isLoggedIn ? "🎉 Welcome back!" : "🔒 Please log in"}</h2>
      <p>
        {isLoggedIn
          ? "Glad to see you again! Enjoy your stay."
          : "You need to log in to access the content."}
      </p>
    </div>
  );
};

export default Greeting;
