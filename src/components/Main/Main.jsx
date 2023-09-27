import React, { useState } from "react";
import ListedMovie from "./ListedMovie";
import WatchedMovie from "./WatchedMovie";
import Box from "./Box";
import Loader from "../Loader";
import Error from "../Error";
import MovieDetails from "./MovieDetails";
// import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const Main = ({
  movies,
  isLoading,
  error,
  selectedMovie,
  selectHandler,
  closeHandler,
  watched,
  addWatchedHandler,
  onDeleteWatched
}) => {
  // const [watched, setWatched] = useState(tempWatchedData);
  // const [watchedMovies, setWatchedMovies] = useLocalStorageState([], "watchedMovies");

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <main className="main">
      <Box>
        {!isLoading && !error ? (
          <ul className="list list-movies">
            {movies?.map((movie) => (
              <ListedMovie
                movie={movie}
                key={movie.imdbID}
                selectHandler={selectHandler}
              />
            ))}
          </ul>
        ) : isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error} />
        ) : (
          ""
        )}
      </Box>

      <Box>
        {selectedMovie ? (
          <MovieDetails
            selectedMovie={selectedMovie}
            closeHandler={closeHandler}
            watched={watched}
            addWatchedHandler={addWatchedHandler}
          />
        ) : (
          <>
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
                <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
              ))}
            </ul>
          </>
        )}
      </Box>
    </main>
  );
};

export default Main;
