import React, { useState } from "react";
import Card from "../components/Card";
import useSearchMovies from "../hooks/useSearchMovies";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  // Use the hook with dynamic query for search
  const { data: searchResults, loading } = useSearchMovies("search/tv", currentPage, resultsPerPage, searchTerm);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search term changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (searchResults.length === 0) {
    return <div>No results found.</div>;
  }

  // Render pagination buttons
  const totalPages = 10; // Adjust this based on the total pages from your API

  const renderPagination = () => {
    const pageNumbers = [];

    // Adjust how many page numbers you want to display
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center space-x-2 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-500"
        >
          Prev
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-500"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search TV Shows</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a TV show..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 rounded bg-gray-700 text-white w-full"
        />
      </div>

      {/* Display Search Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {searchResults.map((show) => (
          <Card key={show.id} item={show} /> // Display each TV show in a Card component
        ))}
      </div>

      {/* Pagination Controls */}
      {renderPagination()}
    </div>
  );
};

export default SearchComponent;
