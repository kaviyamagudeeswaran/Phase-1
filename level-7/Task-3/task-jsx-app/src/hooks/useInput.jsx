import { useState, useRef } from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return { value, onChange: handleChange, inputRef };
};

export default useInput;
