import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';

const Spotlight = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            const favorites = userDoc.data().favorites || [];
            setFavorites(favorites);
          }
        } catch (error) {
          setError('Error fetching favorites. Please try again later.');
          console.error('Error fetching favorites:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setError('Please log in to view your Spotlight.');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (movieId) => {
    if (!auth.currentUser) {
      alert('Please log in to remove movies from your Spotlight.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(movieId),
      });
      setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== movieId));
      alert('Removed from Spotlight!');
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Spotlight</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movieId) => (
            <div
              key={movieId}
              className="text-center bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <Link to={`/movie/${movieId}`}>
                <img
                  src={`https://img.omdbapi.com/?i=${movieId}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`}
                  alt="Movie Poster"
                  className="w-full h-64 object-cover hover:scale-105 transition-all duration-300"
                />
              </Link>
              <div className="p-4">
                <button
                  onClick={() => removeFromFavorites(movieId)}
                  className="mt-2 p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove from Spotlight
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No movies in your Spotlight. Add some from the Home page!</p>
      )}
    </div>
  );
};

export default Spotlight;