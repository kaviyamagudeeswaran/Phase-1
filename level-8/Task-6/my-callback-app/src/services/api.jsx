import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchData = async () => {
  const response = await API.get("/posts");
  return response.data;
};
