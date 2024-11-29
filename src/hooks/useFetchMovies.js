import { useState, useEffect } from "react";

const API_KEY = "2f9537d318f02eea8d56cd7e3c7bb321"; // Your TMDB API Key
const BASE_URL = "https://api.themoviedb.org/3";

const useFetchMovies = (endpoint, page = 1) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Correctly construct the URL
        const url = endpoint.includes('?') 
          ? `${BASE_URL}/${endpoint}&api_key=${API_KEY}&page=${page}`
          : `${BASE_URL}/${endpoint}?api_key=${API_KEY}&page=${page}`;

        console.log("Fetching URL:", url); // Log the exact URL being called

        const response = await fetch(url);
        
        if (!response.ok) {
          const errorBody = await response.text();
          console.error(`HTTP error! status: ${response.status}`, errorBody);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetch result:", result); // Log the full result

        if (result.results && result.results.length > 0) {
          setData(result.results);
        } else {
          console.warn("No results found for the endpoint:", endpoint);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint, page]);

  return { data, loading, error };
};

export default useFetchMovies;