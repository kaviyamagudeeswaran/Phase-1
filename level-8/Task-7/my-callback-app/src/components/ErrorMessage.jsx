import { useLoading } from "../context/LoadingContext";

const LoadingIndicator = () => {
  const { loading } = useLoading();
  return loading ? <div className="loading">Loading...</div> : null;
};

export default LoadingIndicator;
