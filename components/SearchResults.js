import Post from './Post';

const SearchResults = ({ results }) => {
  if (results.length === 0) return <></>;

  return (
    <div className="absolute right-0 z-10 w-full text-black bg-white border-4 border-gray-400 top-20 md:right-10 md:w-6/12 rounded-2xl">
      <div className="p-10">
        <h2 className="mb-3 text-3xl">{results.length} Results</h2>
        {results.map((result, idx) => (
          <Post key={idx} post={result} compact={true} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
