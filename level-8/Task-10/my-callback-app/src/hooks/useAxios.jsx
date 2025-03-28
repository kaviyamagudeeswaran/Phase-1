import { useState, useEffect } from "react";
import axios from "axios";

const cache = new Map();

const useAxios = (url, options = {}, forceRefresh = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Check cache first
      if (!forceRefresh && cache.has(url)) {
        setData(cache.get(url));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(url, options);
        cache.set(url, response.data); // Store response in cache
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options, forceRefresh]);

  return { data, loading, error, refetch: () => useAxios(url, options, true) };
};

export default useAxios;
