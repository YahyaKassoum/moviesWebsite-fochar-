const MovieDetailModal = ({ movie, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg overflow-hidden w-11/12 md:w-3/4 lg:w-1/2">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p>{movie.overview}</p>
            <p className="text-sm text-gray-600">
              Release Date: {movie.release_date}
            </p>
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 mt-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default MovieDetailModal;
  