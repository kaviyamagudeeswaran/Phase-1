import { useState, useEffect } from "react";
import axios from "axios";
import JournalEntryForm from "./components/JournalEntryForm";
import JournalList from "./components/JournalList";

function App() {
  const [journals, setJournals] = useState([]);

  const fetchJournals = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/journals");
      setJournals(data);
    } catch (error) {
      console.error("Error fetching journals:", error);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">📝 Digital Journal</h1>
      <JournalEntryForm fetchJournals={fetchJournals} />
      <JournalList journals={journals} fetchJournals={fetchJournals} />
    </div>
  );
}

export default App;
