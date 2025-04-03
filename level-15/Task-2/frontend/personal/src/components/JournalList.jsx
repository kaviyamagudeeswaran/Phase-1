import axios from "axios";

const JournalList = ({ journals, fetchJournals }) => {
  const deleteJournal = async (id) => {
    await axios.delete(`http://localhost:5000/api/journals/${id}`);
    fetchJournals();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Journal Entries</h2>
      <div className="row">
        {journals.map((entry) => (
          <div className="col-md-4 mb-3" key={entry._id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{entry.title}</h5>
                <p className="card-text">{entry.content}</p>
                <small className="text-muted">
                  {new Date(entry.date).toLocaleDateString()}
                </small>
                <div className="mt-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteJournal(entry._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalList;
