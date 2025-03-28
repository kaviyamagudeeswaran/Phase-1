import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const sendFormData = async (formData) => {
  return await axios.post(API_URL, formData);
};
