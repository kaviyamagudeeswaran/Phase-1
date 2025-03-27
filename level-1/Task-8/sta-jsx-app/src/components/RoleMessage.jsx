const RoleMessage = ({ role }) => {
  return (
    <div className="message-box">
      {role === "admin" ? (
        <h3>🔐 Welcome, Admin! You have full access.</h3>
      ) : role === "user" ? (
        <h3>👤 Welcome, User! Enjoy browsing.</h3>
      ) : (
        <h3>⚠️ Please log in to continue.</h3>
      )}
    </div>
  );
};

export default RoleMessage;
