import { useEffect, useRef } from "react";

const useIntersectionObserver = (callback, options) => {
  const observerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (!targetRef.current) return;

    observerRef.current = new IntersectionObserver(callback, options);
    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return targetRef;
};

export default useIntersectionObserver;
