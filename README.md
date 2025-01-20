# Movie Library

Movie Library is a React-based web application that allows users to search for movies, view their details, and manage a list of favorite movies called "Spotlight." The application uses the OMDB API to fetch movie data.

## Features

- Search for movies by title.
- View detailed information about a selected movie.
- Add movies to your "Spotlight" list.
- Remove movies from your "Spotlight" list.
- Responsive design for seamless use on various devices.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-library.git
   ```

2. Navigate to the project directory:
   ```bash
   cd movie-library
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your OMDB API key:
   ```env
   REACT_APP_OMDB_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
- `npm run eject`: Removes the single build dependency from your project.

## How to Use

1. Open the application in your browser at `http://localhost:3000` after running `npm start`.
2. Use the search bar on the homepage to find movies.
3. Click on a movie poster to view its details.
4. Add or remove movies from your "Spotlight" list using the provided buttons.

## Technologies Used

- React.js
- Tailwind CSS
- Axios for API requests
- React Router for navigation

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to propose changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [OMDB API](https://www.omdbapi.com/) for providing movie data.

