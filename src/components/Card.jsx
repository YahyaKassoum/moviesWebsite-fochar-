import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router hook for navigation

const Card = ({ item , isScroll }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleClick = () => {
    // Pass the entire movie object as state to the MovieDetails page
    navigate(`/moviesDetails/${item.id}`, {
      state: { movie: item },
    });
  };

  // Truncate the title to 25 characters
  const truncateTitle = (title, maxLength) =>
    title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

  return (
    <div
      className={ isScroll===true  ? `bg-gray-800  text-white rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300`:`bg-gray-800 h-full text-white rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300`}
      onClick={handleClick}
    >
      <div className={isScroll==true ?`h-80`:""}>
          <img
        src={
          item.poster_path
            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
            : "/placeholder.jpg" // Fallback if no poster image
        }
        alt={item.title || item.name}
        className={ isScroll==true ?`w-full h-full object-cover`:`w-full   object-cover`}
      />
      </div>
    
      <div className="p-2">
        <h3 className="text-sm font-semibold">
          {truncateTitle(item.title || item.name, 20)}
        </h3>
        <p className="text-xs text-gray-400">⭐ {item.vote_average}</p>
      </div>
    </div>
  );
};

export default Card;
