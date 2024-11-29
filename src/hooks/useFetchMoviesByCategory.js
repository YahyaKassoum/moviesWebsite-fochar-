import { useState, useEffect } from "react";

const API_KEY = "2f9537d318f02eea8d56cd7e3c7bb321"; // Your TMDB API Key
const BASE_URL = "https://api.themoviedb.org/3";

const useFetchMoviesByCategory = (categoryId, page = 1) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!categoryId) return; // Don't fetch if there's no category selected

      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${categoryId}&api_key=${API_KEY}&page=${page}
`;
        const response = await fetch(url);
        const result = await response.json();
        setData(result.results || []);
      } catch (error) {
        console.error("Error fetching movies by category:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [categoryId, page]); // Re-fetch when categoryId or page changes

  return { data, loading };
};

export default useFetchMoviesByCategory;
