import { useQuery } from "react-query";

const useOptimizedFetch = (url) => {
  return useQuery(["data", url], async () => {
    const res = await fetch(url);
    return res.json();
  });
};

export default useOptimizedFetch;
