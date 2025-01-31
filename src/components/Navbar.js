import { Link } from 'react-router-dom';
import { FilmIcon } from 'lucide-react';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Navbar({ user }) {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <nav className="bg-gray-900 text-gray-300 p-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
          <FilmIcon className="h-6 w-6" />
          <span>Movie Library</span>
        </Link>

        <div className="space-x-4 text-sm">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/spotlight" className="hover:text-white transition-colors">
            Spotlight
          </Link>

          {user ? (
            <>
              <span className="text-white">{user.displayName || 'User'}</span>
              <button
                onClick={handleSignOut}
                className="text-white bg-red-600 p-2 rounded-md hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-white transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}