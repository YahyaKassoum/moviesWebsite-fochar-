const ScrollableSection = ({ title, items }) => {
    const scrollContainer = React.useRef();
  
    const scroll = (direction) => {
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    };
  
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
          >
            ⬅️
          </button>
          <div
            ref={scrollContainer}
            className="flex gap-4 overflow-x-auto scrollbar-hide"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-40 bg-gray-700 text-white p-4 rounded-lg"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster}`}
                  alt={item.title}
                  className="rounded-md"
                />
                <p className="mt-2 text-sm">{item.title}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
          >
            ➡️
          </button>
        </div>
      </div>
    );
  };
  
  export default ScrollableSection;
  