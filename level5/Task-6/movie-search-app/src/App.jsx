import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// MovieSearch from "./MovieSearch";
import MovieDetails from "./components/MovieDetails";
import MovieSearch from "./pages/MovieSearch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
