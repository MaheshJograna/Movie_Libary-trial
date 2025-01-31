import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const apikey = process.env.REACT_APP_OMDB_API_KEY;
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apikey}`);
      if (response.data.Response === 'True') {
        const moviesWithFavorites = await Promise.all(
          response.data.Search.map(async (movie) => {
            const isFavorite = await checkIfFavorite(movie.imdbID);
            return { ...movie, isFavorite };
          })
        );
        setMovies(moviesWithFavorites);
      } else {
        setError(response.data.Error || 'No movies found.');
        setMovies([]);
      }
    } catch (error) {
      setError('Error fetching movies. Please try again later.');
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async (movieId) => {
    if (auth.currentUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          const favorites = userDoc.data().favorites || [];
          return favorites.includes(movieId);
        }
      } catch (error) {
        console.error('Error checking favorites:', error);
      }
    }
    return false;
  };

  const addToFavorites = async (movie) => {
    if (!auth.currentUser) {
      alert('Please log in to add movies to your Spotlight.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        favorites: arrayUnion(movie.imdbID),
      });
      console.log('Movie added to favorites:', movie.imdbID); // Debugging
      alert('Added to Spotlight!');
      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m.imdbID === movie.imdbID ? { ...m, isFavorite: true } : m
        )
      );
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add to Spotlight. Please try again.');
    }
  };

  const removeFromFavorites = async (movie) => {
    if (!auth.currentUser) {
      alert('Please log in to remove movies from your Spotlight.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(movie.imdbID),
      });
      console.log('Movie removed from favorites:', movie.imdbID); // Debugging
      alert('Removed from Spotlight!');
      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m.imdbID === movie.imdbID ? { ...m, isFavorite: false } : m
        )
      );
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('Failed to remove from Spotlight. Please try again.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchMovies();
    } else {
      setError('Please enter a search term.');
    }
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
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
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

              {movie.isFavorite ? (
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
        ))}
      </div>
    </div>
  );
};

export default Home;