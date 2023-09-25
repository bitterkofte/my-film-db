import React from 'react'

const ListedMovie = ({movie, selectHandler}) => {
  return (
    <li onClick={() => selectHandler(movie.imdbID)} >
      {movie.Poster !== "N/A" ? 
        <img src={movie.Poster} alt={`${movie.Title} poster`} onClick={() => console.log(movie.Title.split(' ').map(m => m.charAt(0)).slice(0,2).join(' '))} />
        :
        <div className='no-img'><p>{movie.Title.split(' ').map(m => m.charAt(0)).slice(0,2).join('')}</p></div>
      }
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

export default ListedMovie