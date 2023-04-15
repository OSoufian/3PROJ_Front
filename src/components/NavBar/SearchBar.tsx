import { ChangeEvent } from 'react';

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
    <form onSubmit={handleFormSubmit} className="flex items-center w-1/2 max-w-md mx-auto search-bar dark:bg-gray-700">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search video..."
        className="flex-grow px-3 py-2 rounded-l-md focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:focus:border-blue-500 border border-gray-300"
      />
      <button type="submit" className="px-4 py-2 rounded-r-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:border-blue-500 border border-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:hover:bg-gray-500 dark:text-green-100 dark:focus:border-blue-500">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
