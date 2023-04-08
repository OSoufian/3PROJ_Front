import { ChangeEvent, useState } from 'react';

function SearchBar({ onSearch }: {onSearch: Function}) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event?.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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