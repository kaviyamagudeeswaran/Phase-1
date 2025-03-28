import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import "../styles/App.css";

const Home = () => {
  return (
    <div className="container">
      <h2>📚 Blog Posts</h2>
      {blogPosts.map((post) => (
        <div key={post.id} className="blog-item">
          {post.icon}
          <h3>{post.title}</h3>
          <p>{post.shortDescription}</p>
          <Link to={`/post/${post.id}`} className="read-more">
            Read More ➡️
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
