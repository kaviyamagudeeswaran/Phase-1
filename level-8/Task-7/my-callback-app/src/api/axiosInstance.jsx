import axios from "axios";
import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

// Create Axios Instance
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Replace with your API
});

// Axios Interceptors
const useAxiosInterceptor = () => {
  const { setLoading } = useContext(LoadingContext);

  // Request Interceptor
  api.interceptors.request.use(
    (config) => {
      setLoading(true); // Show loader
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            alert("Unauthorized! Please login again.");
            break;
          case 500:
            alert("Server Error! Try again later.");
            break;
          default:
            alert("Something went wrong!");
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export { useAxiosInterceptor, api };
