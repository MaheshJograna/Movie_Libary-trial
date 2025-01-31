import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase auth
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import Firebase sign-up method
import { useNavigate, Link } from 'react-router-dom'; // For navigation

const Signup = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [username, setUsername] = useState(''); // State for username input
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Hook for navigation

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear any previous errors
    setLoading(true); // Set loading state to true

    try {
      // Create a new user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's profile with the provided username
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      // Redirect to home page after successful signup
      navigate('/');
    } catch (error) {
      // Handle errors
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;