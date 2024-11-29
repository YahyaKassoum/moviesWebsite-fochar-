import React, { useState, useEffect } from "react";
import Card from "../components/Card"; // Import the Card component

const Anime = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resultsPerPage = 10;

  useEffect(() => {
    const fetchAnime = async () => {
      const BASE_URL = "https://api.themoviedb.org/3";  // TMDB API base URL
      const API_KEY = "2f9537d318f02eea8d56cd7e3c7bb321";  // Your TMDB API key
      
      try {
        const response = await fetch(
          `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&page=${currentPage}`
        );
        const data = await response.json();
        setAnime(data.results);  // Store the fetched anime results
        setTotalPages(data.total_pages || 1);  // Update total pages from API response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime data:", error);
        setLoading(false);
      }
    };

    fetchAnime();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the page when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Number of page buttons to show
    
    // Calculate start and end pages
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Page number buttons */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ${page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
  </div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Anime & Cartoon</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {anime.map((animeItem) => (
          <Card key={animeItem.id} item={animeItem} />  
        ))}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default Anime;
