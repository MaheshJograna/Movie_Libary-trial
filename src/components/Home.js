import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const apikey = process.env.REACT_APP_OMDB_API_KEY
      console.log (apikey);
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apikey}`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  // Add movie to local storage favorites (Spotlight)
  const addToFavorites = (movie) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = existingFavorites.some((fav) => fav.imdbID === movie.imdbID);

    if (!isFavorite) {
      const updatedFavorites = [...existingFavorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert('Added to Spotlight!');
      // Trigger re-render by updating movies state
      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m.imdbID === movie.imdbID
            ? { ...m, isFavorite: true }
            : m
        )
      );
    } else {
      alert('This movie is already in your Spotlight.');
    }
  };

  // Remove movie from local storage favorites (Spotlight)
  const removeFromFavorites = (movie) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = existingFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    alert('Removed from Spotlight!');
    // Trigger re-render by updating movies state
    setMovies((prevMovies) =>
      prevMovies.map((m) =>
        m.imdbID === movie.imdbID
          ? { ...m, isFavorite: false }
          : m
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center text-blue-600 mb-6">Welcome to the Movie Library</h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie"
          className="p-2 w-80 rounded-md border border-gray-300 text-black"
        />
        <button
          type="submit"
          className="ml-4 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-white">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies &&
          movies.map((movie) => {
            // Check if movie is in favorites (spotlight)
            const isFavorite = JSON.parse(localStorage.getItem('favorites'))?.some(
              (fav) => fav.imdbID === movie.imdbID
            );
            return (
              <div
                key={movie.imdbID}
                className="text-center bg-gray-800 rounded-lg overflow-hidden shadow-md"
              >
                <Link to={`/movie/${movie.imdbID}`}>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-64 object-cover hover:scale-105 transition-all duration-300"
                  />
                </Link>
                <div className="p-4 text-white">
                  <h3 className="text-xl font-semibold">{movie.Title}</h3>
                  <p>{movie.Year}</p>

                  {isFavorite ? (
                    <button
                      onClick={() => removeFromFavorites(movie)}
                      className="mt-2 p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Remove from Spotlight
                    </button>
                  ) : (
                    <button
                      onClick={() => addToFavorites(movie)}
                      className="mt-2 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Spotlight It
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
