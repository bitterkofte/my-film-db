import React, { useRef, useState } from 'react'
import { useKeyAction } from '../../hooks/useKeyAction';

const SearchBar = ({query, setQuery}) => {
  const inputEl = useRef(null);

  useKeyAction("enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  })

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

export default SearchBar