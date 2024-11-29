import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import Anime from './pages/Anime';
import MovieDetails from './pages/MovieDetails';
import StreamContent from './pages/StreamContent'; // Updated import
import Navbar from './components/Navbar';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar/>
        <main className="py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/TVShows" element={<TVShows />} />
            <Route path="/Anime" element={<Anime />} />
            <Route path="/stream/:id/season/:season/episode/:episode" element={<StreamContent />} />
            <Route path="/streamMovie/:id" element={<StreamContent />} />
            <Route path="/moviesDetails/:id" element={<MovieDetails />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;