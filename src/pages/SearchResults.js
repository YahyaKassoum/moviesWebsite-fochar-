import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import useSearchMovies from "../hooks/useSearchMovies";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const [page, setPage] = useState(1);

  const { data: searchResults, loading } = useSearchMovies("search/multi", query, page);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (searchResults.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          disabled
          className="p-2 rounded bg-gray-700 text-white w-full"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {searchResults.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Previous
        </button>
        <button onClick={handleNextPage} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
