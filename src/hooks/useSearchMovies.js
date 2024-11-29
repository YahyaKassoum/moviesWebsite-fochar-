import { useState, useEffect } from "react";

const API_KEY = "2f9537d318f02eea8d56cd7e3c7bb321"; // Your TMDB API Key
const BASE_URL = "https://api.themoviedb.org/3";

const useFetchMovies = (endpoint, query = "", page = 1) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
    
        // For search queries, use the search/multi endpoint with the query parameter
         const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
      

      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, query, page]);

  return { data, loading };  
};

export default useFetchMovies;
 