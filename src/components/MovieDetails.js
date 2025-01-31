import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { auth, db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apikey = process.env.REACT_APP_OMDB_API_KEY;
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${apikey}`);
        if (response.data.Response === 'True') {
          setMovieDetails(response.data);
          if (auth.currentUser) {
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (userDoc.exists()) {
              const favorites = userDoc.data().favorites || [];
              setIsFavorite(favorites.includes(id));
            }
          }
        } else {
          setError(response.data.Error || 'Movie not found.');
        }
      } catch (error) {
        setError('Error fetching movie details. Please try again later.');
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const addToFavorites = async () => {
    if (!auth.currentUser) {
      alert('Please log in to add movies to your Spotlight.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        favorites: arrayUnion(id),
      });
      setIsFavorite(true);
      alert('Added to Spotlight!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async () => {
    if (!auth.currentUser) {
      alert('Please log in to remove movies from your Spotlight.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(id),
      });
      setIsFavorite(false);
      alert('Removed from Spotlight!');
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  if (loading) {
    return <p className="text-center text-white">Loading movie details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6 text-white">
      {movieDetails && (
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
                onClick={addToFavorites}
                className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Spotlight It!
              </button>
            )}
            {isFavorite && (
              <button
                onClick={removeFromFavorites}
                className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove from Spotlight
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;