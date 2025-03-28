import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import "../styles/App.css";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  return (
    <div className="post-container">
      {post ? (
        <>
          {post.icon}
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <Link to="/" className="back-btn">
            ⬅️ Back to Home
          </Link>
        </>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default BlogPost;
