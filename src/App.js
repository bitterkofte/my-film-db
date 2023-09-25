import { useEffect, useState } from "react";
// import { AiFillStar } from 'react-icons/ai'
import Navbar from "./components/Nav/Navbar";
import Main from "./components/Main/Main";
import Logo from "./components/Nav/Logo";
import SearchBar from "./components/Nav/SearchBar";
import NumResults from "./components/Nav/NumResults";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const apikey = '8fca1247';
const Tempquery = "Interstellar"
const errorMessages = [
  "Something went wrong while fetching movies and shows 🕳",
  "We couldn't find anything related. 😢",
];

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(Tempquery)
  const [selectedMovie, setSelectedMovie] = useState(null)

  // fetch(`http://www.omdbapi.com/?s=Interstellar&apikey=${apikey}`)
  // .then(res => res.json())
  // .then(data => console.log('mydata: ', data))

  const selectHandler = (id) => {
    setSelectedMovie(prev => prev !== id ? id : null);
  }

  const closeHandler = () => {
    setSelectedMovie(null);
  }

  const fetchMovies = async () => {
    try {
      console.log("FETCHING")
      setIsLoading(true);
      setError('');
      const res = await  fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apikey}`);
      if(!res.ok) throw new Error(errorMessages.at(0));
      const data = await res.json();
      if(data.Response === "False") throw new Error(errorMessages.at(1));
      // console.log("RSLT: ", data.Search);
      setMovies(data.Search);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    const searching = setTimeout(() => {
      fetchMovies();
    }, 1000);

    return () => {
      console.log("CLEANUP")
      clearTimeout(searching)
    }
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
      <Navbar >
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies}/>
      </Navbar>
      <Main movies={movies} tempWatchedData={tempWatchedData} selectedMovie={selectedMovie} selectHandler={selectHandler} closeHandler={closeHandler} isLoading={isLoading} error={error}/>
    </>
  );
}