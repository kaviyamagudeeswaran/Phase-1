import axios from "axios";

// Google Books API or any third-party API
const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

export const searchBooks = async (query) => {
  const response = await axios.get(`${API_URL}${query}`);
  return response.data.items.map((item) => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors || [],
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,
  }));
};
