import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const StreamContent = () => {
  const { id, season, episode } = useParams();
  const location = useLocation();
  const [isTV, setIsTV] = useState(location.state?.isTV || false);
  const [selectedServer, setSelectedServer] = useState(null);

  // Define streaming servers with support for both movies and TV series
  const servers = [
    {
      name: "VidSrc ICU",
      getUrl: () => {
        if (isTV) {
          return `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`;
        }
        return `https://vidsrc.icu/embed/movie/${id}`;
      },
    },
    {
      name: "VidSrc Dev",
      getUrl: () => {
        if (isTV) {
          return `https://vidsrc.dev/embed/tv/${id}/${season}/${episode}`;
        }
        return `https://vidsrc.dev/embed/movie/${id}`;
      },
    },
  ];

  // Auto-select first server on component mount
  useEffect(() => {
    if (servers.length > 0) {
      setSelectedServer(servers[0]);
    }
  }, [id, season, episode, isTV]);

  // Dynamically create iframe to prevent ad-blockers from detecting static embeds
  const createIframe = (url) => {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.title = isTV
      ? `Season ${season}, Episode ${episode}`
      : "Movie";
    iframe.className = "rounded-lg shadow-lg";
    return iframe;
  };

  useEffect(() => {
    if (selectedServer) {
      const container = document.getElementById("iframe-container");
      container.innerHTML = ""; // Clear previous iframe
      const iframe = createIframe(selectedServer.getUrl());
      container.appendChild(iframe);
    }
  }, [selectedServer]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {isTV
          ? `Streaming Season ${season}, Episode ${episode}`
          : "Streaming Movie"}
      </h1>

      {/* Server Selection */}
      <div className="flex gap-4 mb-4">
        {servers.map((server, index) => (
          <button
            key={index}
            onClick={() => setSelectedServer(server)}
            className={`
              px-4 py-2 rounded-lg transition-colors
              ${
                selectedServer?.name === server.name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }
            `}
          >
            {server.name}
          </button>
        ))}
      </div>

      {/* Dynamic Iframe Container */}
      <div id="iframe-container" className="w-full aspect-video"></div>
    </div>
  );
};

export default StreamContent;
