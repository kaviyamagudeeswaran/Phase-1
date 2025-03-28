import { FaLaptopCode, FaRoute, FaDatabase } from "react-icons/fa";

export const blogPosts = [
  {
    id: 1,
    title: "Introduction to Web Development",
    shortDescription:
      "Learn the basics of web development with HTML, CSS, and JavaScript.",
    content: "Full content about web development...",
    icon: <FaLaptopCode className="blog-icon" />,
  },
  {
    id: 2,
    title: "Understanding React Router",
    shortDescription: "Deep dive into client-side routing with React Router.",
    content: "Full content about React Router...",
    icon: <FaRoute className="blog-icon" />,
  },
  {
    id: 3,
    title: "Databases in Web Development",
    shortDescription: "How databases work in modern web applications.",
    content: "Full content about databases...",
    icon: <FaDatabase className="blog-icon" />,
  },
];
