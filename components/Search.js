import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchResults from './SearchResults';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchresults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      if (searchTerm === '') {
        setSearchresults([]);
      } else {
        const res = await fetch(`/api/search?q=${searchTerm}`);
        const { results } = await res.json();
        setSearchresults(results);
      }
    };

    getResults();
  }, [searchTerm]);

  return (
    <div className="relative p-4 bg-gray-600">
      <div className="container flex items-center justify-center mx-auto md:justify-end">
        <div className="relative text-gray-600 w-72">
          <form>
            <input
              type="text"
              name="search"
              id="search"
              className="h-10 px-5 pr-10 text-sm bg-white rounded-full focus:outline-none w-72"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Post"
            />

            <FaSearch className="absolute top-0 right-0 mt-3 mr-4 text-black " />
          </form>
        </div>
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default Search;
