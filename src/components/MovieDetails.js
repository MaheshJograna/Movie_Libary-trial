import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=2313927a`);
        setMovieDetails(response.data);

        // Check if the movie is already in favorites
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteExists = existingFavorites.some((fav) => fav.imdbID === response.data.imdbID);
        setIsFavorite(favoriteExists);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const addToFavorites = (movie) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = [...existingFavorites, movie];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(true);
    alert('Added to Spotlight!');
  };

  const removeFromFavorites = (movie) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = existingFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(false);
    alert('Removed from Spotlight!');
  };

  return (
    <div className="container mx-auto p-6 text-white">
      {movieDetails ? (
        <div className="flex flex-col items-center">
          <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            className="w-48 md:w-64 mb-4"
          />
          <h1 className="text-3xl font-bold mb-4">{movieDetails.Title}</h1>
          <p className="text-lg mb-4">Year: {movieDetails.Year}</p>
          <p className="text-lg mb-4">Genre: {movieDetails.Genre}</p>
          <p className="text-lg mb-4">Plot: {movieDetails.Plot}</p>
          <div className="flex space-x-4">
            {!isFavorite && (
              <button
                onClick={() => addToFavorites(movieDetails)}
                className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Spotlight It!
              </button>
            )}
            {isFavorite && (
              <button
                onClick={() => removeFromFavorites(movieDetails)}
                className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove from Spotlight
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
