import { useState } from "react";
import axios from "axios";

const JournalEntryForm = ({ fetchJournals }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/journals", {
        title,
        content,
        tags: tags.split(","),
      });
      alert("Journal entry added successfully!");
      fetchJournals();
      setTitle("");
      setContent("");
      setTags("");
    } catch (error) {
      alert("Failed to add entry. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add Journal Entry</h2>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your journal..."
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Tags (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., personal, diary"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Entry
        </button>
      </form>
    </div>
  );
};

export default JournalEntryForm;
