import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearch(searchText);
  };

  return (
    <form onSubmit={handleFormSubmit} className="search-bar">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search videos..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;