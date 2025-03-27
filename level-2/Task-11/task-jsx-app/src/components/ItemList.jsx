const ItemList = () => {
  const items = ["Apple 🍎", "Banana 🍌", "Orange 🍊", "Mango 🥭", "Grapes 🍇"];

  return (
    <div className="list-box">
      <h2>🛍️ Shopping List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
