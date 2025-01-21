import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (movieID) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== movieID);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center text-blue-600 mb-6">Your Spotlight</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-white">Add something on your Spotlight!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.imdbID}
              className="text-center bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 object-cover hover:scale-105 transition-all duration-300"
              />
              <div className="p-4 text-white">
                <h3 className="text-xl font-semibold">{movie.Title}</h3>
                <p>{movie.Year}</p>
                <button
                  onClick={() => removeFromFavorites(movie.imdbID)}
                  className="mt-2 p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove from Spotlight
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
