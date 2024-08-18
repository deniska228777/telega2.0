import { useState } from 'react'
import Input from './Input.jsx'

export const Search = () => {
  const [search, setSearch] = useState();
  const onChangeInput = (e) => {
    const searchTerm = e.target;
    setSearch(searchTerm);
  }

  return (
    <Input
      type="text"
      name="search"
      className="search-input"
      value={search}
      onChange={onChangeInput}
      placeholder="Search"
    />
  )
}