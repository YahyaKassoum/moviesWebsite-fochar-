import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Card from "./Card";

const SimilarMovies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [isTV, setIsTV] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=2f9537d318f02eea8d56cd7e3c7bb321`
        );
        const tvData = await tvResponse.json();

        if (!tvResponse.ok || tvData.success === false) {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=2f9537d318f02eea8d56cd7e3c7bb321`
          );
          const movieData = await movieResponse.json();
          if (!movieResponse.ok) throw new Error("Failed to fetch movie details");
          setContent(movieData);
          setIsTV(false);
        } else {
          setContent(tvData);
          setIsTV(true);
        }
      } catch (error) {
        setError("Failed to load content details. Please try again later.");
        console.error("Error fetching content details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCastAndSimilar = async () => {
      try {
        const castResponse = await fetch(
          `https://api.themoviedb.org/3/${isTV ? "tv" : "movie"}/${id}/credits?api_key=2f9537d318f02eea8d56cd7e3c7bb321`
        );
        const castData = await castResponse.json();
        setCast(castData.cast?.slice(0, 5) || []);

        const similarResponse = await fetch(
          `https://api.themoviedb.org/3/${isTV ? "tv" : "movie"}/${id}/similar?api_key=2f9537d318f02eea8d56cd7e3c7bb321`
        );
        const similarData = await similarResponse.json();
        setSimilarMovies(similarData.results || []);
      } catch (error) {
        console.error("Error fetching cast and similar movies:", error);
      }
    };

    fetchDetails().then(fetchCastAndSimilar);
  }, [id, isTV]);

  const handleWatchMovie = () => {
    navigate(`/streamMovie/${id}`, { state: { isTV: false } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto bg-white dark:bg-gray-900 min-h-screen">
      

          <h2 className="text-xl font-semibold mt-6 mb-4">Similar Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {similarMovies.map((movie) => (
              <div key={movie.id}>
                <Card item={movie} isScroll={false} />
              </div>  
            ))}
          
          </div>
        </div>
    

  );
};

export default SimilarMovies;
