import React, { useState } from 'react'
import ListedMovie from './ListedMovie';
import WatchedMovie from './WatchedMovie';
import Box from './Box';

const Main = ({movies, tempWatchedData}) => {
  const [watched, setWatched] = useState(tempWatchedData);

  const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <main className="main">
      <Box>
        <ul className="list">
          {movies?.map((movie) => (
            <ListedMovie movie={movie} key={movie.imdbID} />
          ))}
        </ul>
      </Box>

      <Box>
        <div className="summary">
          <h2>Movies you watched</h2>
          <div>
            <p>
              <span>#️⃣</span>
              <span>{watched.length} movies</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>{avgImdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{avgUserRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{avgRuntime} min</span>
            </p>
          </div>
        </div>

        <ul className="list">
          {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie.imdbID} />
          ))}
        </ul>
      </Box>
    </main>
  )
}

export default Main