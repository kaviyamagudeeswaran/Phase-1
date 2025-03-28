import React, { useState, useCallback } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import "../styles/styles.css";

const IntersectionObserverComponent = () => {
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => i + 1)
  );

  const loadMoreItems = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from({ length: 5 }, (_, i) => prevItems.length + i + 1),
      ]);
    }
  }, []);

  const targetRef = useIntersectionObserver(loadMoreItems, { threshold: 1 });

  return (
    <div className="container">
      <h2>Infinite Scroll</h2>
      <div className="list">
        {items.map((item) => (
          <div key={item} className="item">
            Item {item}
          </div>
        ))}
        <div ref={targetRef} className="loading">
          Loading more...
        </div>
      </div>
    </div>
  );
};

export default IntersectionObserverComponent;
