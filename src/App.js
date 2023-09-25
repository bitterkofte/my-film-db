import { useEffect, useState } from "react";
// import { AiFillStar } from 'react-icons/ai'
import Navbar from "./components/Nav/Navbar";
import Main from "./components/Main/Main";
import Logo from "./components/Nav/Logo";
import SearchBar from "./components/Nav/SearchBar";
import NumResults from "./components/Nav/NumResults";


const apikey = "8fca1247";
const Tempquery = "Interstellar";
const errorMessages = [
  "Something went wrong while fetching movies and shows 🕳",
  "We couldn't find anything related. 😢",
];

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(Tempquery);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watched, setWatched] = useState([]);

  // fetch(`http://www.omdbapi.com/?s=Interstellar&apikey=${apikey}`)
  // .then(res => res.json())
  // .then(data => console.log('mydata: ', data))

  const selectHandler = (id) => {
    setSelectedMovie((prev) => (prev !== id ? id : null));
  };

  const closeHandler = () => {
    setSelectedMovie(null);
  };

  const addWatchedHandler = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const fetchMovies = async () => {
    try {
      console.log("FETCHING");
      setIsLoading(true);
      setError("");
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apikey}&s=${query}`
      );
      if (!res.ok) throw new Error(errorMessages.at(0));
      const data = await res.json();
      if (data.Response === "False") throw new Error(errorMessages.at(1));
      // console.log("RSLT: ", data.Search);
      setMovies(data.Search);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    const searching = setTimeout(() => {
      fetchMovies();
    }, 1000);

    return () => {
      console.log("CLEANUP");
      clearTimeout(searching);
    };
  }, [query]);

  // useEffect(() => {
  //   if (query.length < 3) {
  //     setMovies([]);
  //     setError('');
  //     return;
  //   }

  //   fetchMovies();
  // }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main
        movies={movies}
        watched={watched}
        addWatchedHandler={addWatchedHandler}
        selectedMovie={selectedMovie}
        selectHandler={selectHandler}
        closeHandler={closeHandler}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}
