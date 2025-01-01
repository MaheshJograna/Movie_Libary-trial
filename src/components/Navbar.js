import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Movie Library
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-indigo-400">
            Home
          </Link>
          <Link to="/favorites" className="hover:text-indigo-400">
            Spotlight
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
