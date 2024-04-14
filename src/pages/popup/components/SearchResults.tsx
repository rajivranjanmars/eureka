
interface SearchResult {
    title: string;
    url: string;
}


const SearchResults = ({ searchResults }) => {
    return (
        <div className="grid grid-cols-3 gap-3 mt-5 mb-3 px-3 h-[88vh] overflow-y-auto">
            {searchResults.map((result, index) => (
                <a
                    key={index}
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 bg-opacity-40 p-3 rounded-lg shadow-md flex flex-col justify-center items-start py-3 hover:cursor-pointer max-w-52 max-h-32"
                >
                    <h1 className="text-lg font-bold text-gray-200">{result.title}</h1>
                </a>
            ))}
        </div>
    );
};

export default SearchResults;