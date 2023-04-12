import { ChangeEvent, useState } from 'react';
import "@/styles/SearchBar.css";

function SearchBar({ onSearch }: {onSearch: Function}) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event?.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Search submitted:', searchText);
    onSearch(searchText);
  };

  return (
    <form onSubmit={handleFormSubmit} className="search-bar">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search video..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;