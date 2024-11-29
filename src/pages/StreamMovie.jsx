import React from "react";
import { useParams, useLocation } from "react-router-dom";

const StreamContent = () => {
  const { id, season, episode } = useParams();
  const location = useLocation();
  const isTV = location.state?.isTV || false; // Determine if it's TV or movie based on state

  const generateWatchLink = () => {
    if (!isTV) {

      // Movie stream link
      return `https://vidsrc.icu/embed/movie/${id}`;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        {isTV
          ? `Streaming Season ${season}, Episode ${episode}`
          : "Streaming Movie"}
      </h1>
      <iframe
        src={generateWatchLink()}
        width="100%"
        height="500"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={isTV ? `Season ${season}, Episode ${episode}` : "Movie"}
        className="rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default StreamContent;
