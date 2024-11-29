import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SimilarMovies from "../components/similarmovies";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isTV, setIsTV] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // First try as a TV show
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=2f9537d318f02eea8d56cd7e3c7bb321`
        );
        const tvData = await tvResponse.json();
        
        if (!tvResponse.ok || tvData.success === false) {
          // If not a TV show, try as a movie
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

    if (!location.state?.content) {
      fetchDetails();
    } else {
      setContent(location.state.content);
      setIsTV(location.state.content.number_of_seasons !== undefined);
      setLoading(false);
    }
  }, [id, location.state]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (isTV && id) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?api_key=2f9537d318f02eea8d56cd7e3c7bb321`
          );
          const data = await response.json();
          if (!response.ok) throw new Error("Failed to fetch episodes");
          setEpisodes(data.episodes || []);
        } catch (error) {
          setError("Failed to load episodes. Please try again later.");
          console.error("Error fetching episodes:", error);
          setEpisodes([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEpisodes();
  }, [id, selectedSeason, isTV]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(Number(event.target.value));
  };

  const handleWatchMovie = () => {
    navigate(`/streamMovie/${id}`, { state: { isTV: false } });
  };

  const isEpisodeAvailable = (episode) => {
    const airDate = new Date(episode.air_date);
    const today = new Date();
    return airDate <= today;
  };

  const isContentAvailable = () => {
    if (!content) return false;
    const releaseDate = new Date(content.release_date || content.first_air_date);
    const today = new Date();
    return releaseDate <= today;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          No content found.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-900">
      {/* Hero Section with Backdrop */}
      <div 
        className="relative w-full h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${content.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{content.title || content.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-90">
            <span>📅 {content.release_date || content.first_air_date}</span>
            <span>⭐ {content.vote_average?.toFixed(1)}/10</span>
            <span>🌐 {content.original_language?.toUpperCase()}</span>
            {isTV && <span>📺 {content.number_of_seasons} Seasons</span>}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[300px,1fr] gap-8">
        {/* Poster Section */}
        <div className="space-y-4">
          {content.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
              alt={content.title || content.name}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No poster available</span>
            </div>
          )}

          {/* Watch Button for Movies */}
          {!isTV && (
            <button
              onClick={handleWatchMovie}
              disabled={!isContentAvailable()}
              className={`w-full py-3 px-6 rounded-lg font-medium text-white 
                ${isContentAvailable() 
                  ? 'bg-blue-600 hover:bg-blue-700 transition-colors'
                  : 'bg-gray-400 cursor-not-allowed'}
                flex items-center justify-center gap-2`}
            >
              <span>▶️</span>
              {isContentAvailable() ? 'Watch Now' : 'Coming Soon'}
            </button>
          )}
        </div>

        {/* Content Details Section */}
        <div className="space-y-6 overflow-hidden">
    

          {/* TV Show Seasons and Episodes */}
          {/* Watch Now Button for Movie */}
{!isTV && (
  <button
    onClick={handleWatchMovie}
    disabled={!isContentAvailable()}
    className={`w-full py-3 px-6 rounded-lg font-medium text-white 
      ${isContentAvailable() 
        ? 'bg-blue-600 hover:bg-blue-700 transition-colors'
        : 'bg-gray-400 cursor-not-allowed' }
      flex items-center justify-center gap-2`}
  >
    <span>▶️</span>
    {isContentAvailable() ? 'Watch Now' : 'Coming Soon'}
  </button>
)}

{/* Content Details Section */}
<div className="space-y-6 overflow-hidden">
  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
    <h2 className="text-xl font-semibold mb-2">Overview</h2>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
      {content.overview}
    </p>
  </div>

  {/* TV Show Seasons and Episodes */}
  {isTV && content.number_of_seasons > 0 && (
    <div className="space-y-4">
      {/* Season Selector */}
      <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <label htmlFor="seasons" className="font-medium">
          Select Season:
        </label>
        <select
          id="seasons"
          value={selectedSeason}
          onChange={handleSeasonChange}
          className="px-3 py-2 border rounded-md bg-white dark:bg-gray-700"
        >
          {Array.from({ length: content.number_of_seasons }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              Season {index + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Episodes Carousel */}
      {episodes.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Episodes</h2>
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() =>
                document.getElementById("episodes-scroll").scrollBy({
                  left: -200,
                  behavior: "smooth",
                })
              }
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={() =>
                document.getElementById("episodes-scroll").scrollBy({
                  left: 200,
                  behavior: "smooth",
                })
              }
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full"
            >
              ▶
            </button>

            {/* Episode Cards */}
            <div
              id="episodes-scroll"
              className="flex gap-4 py-2 overflow-x-auto scrollable-container"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE
              }}
            >
              {episodes.map((episode) => {
                const available = isEpisodeAvailable(episode);
                return (
                  <div
                    key={episode.id}
                    className={`
                      min-w-[200px] max-w-[200px] p-4 rounded-lg border flex-shrink-0
                      transition-all flex flex-col gap-2
                      ${available
                        ? "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-gray-200 dark:border-gray-700"
                        : "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"}
                    `}
                    onClick={() => {
                      if (available) {
                        navigate(
                          `/stream/${id}/season/${selectedSeason}/episode/${episode.episode_number}`,
                          { state: { isTV: true } }
                        );
                      }
                    }}
                  >
                    <h3 className="font-medium text-sm md:text-base">
                      Ep {episode.episode_number}: {episode.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {episode.air_date}
                    </p>
                    {!available && (
                      <span className="text-xs text-gray-500">
                        Coming soon
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          No episodes available for this season.
        </div>
      )}
    </div>
  )}
</div>


        </div>
      </div>
      <div>
    
      <SimilarMovies/>
        
    </div>
    </div>
  );
};

export default MovieDetails;