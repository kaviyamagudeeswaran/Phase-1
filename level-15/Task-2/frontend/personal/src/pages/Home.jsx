import JournalEntryForm from "../components/JournalEntryForm";
import JournalList from "../components/JournalList";

const Home = ({ journals, fetchJournals }) => {
  return (
    <div>
      <h1>Personal Journal</h1>
      <JournalEntryForm fetchJournals={fetchJournals} />
      <JournalList journals={journals} fetchJournals={fetchJournals} />
    </div>
  );
};

export default Home;
