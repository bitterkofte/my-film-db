import React from 'react'

const MovieDetails = ({selectedMovie, closeHandler}) => {
  return (
    <div>
      <button className='btn-back' onClick={closeHandler}>&larr;</button>
      <p className=''>{selectedMovie}</p>
    </div>
  )
}

export default MovieDetails