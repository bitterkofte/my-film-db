import { useEffect, useState } from "react";

export function useLocalStorageState (initialState, assetName) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(assetName);
    return storedValue ? JSON.parse(storedValue) : initialState;
  })

  useEffect(() => {
    localStorage.setItem(assetName, JSON.stringify(value));
  }, [value, assetName]);
  
  return [value, setValue];
}