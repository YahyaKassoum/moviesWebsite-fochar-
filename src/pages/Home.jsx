import React, { useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies";
import Card from "../components/Card"; // Import the Card component
import AutoScrollSection from "../components/Auto-Scroll";
import Categories from "../components/Categories";
import useFetchMoviesByCategory from "../hooks/useFetchMoviesByCategory";
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Construct the endpoint dynamically
  const endpoint = selectedCategory
    ? `discover/movie?with_genres=${selectedCategory}`
    : "trending/movie/day";

  const { data: trending, loading, error } = useFetchMovies(endpoint);

  const handleCategorySelect = (categoryId) => {
    console.log("Selected category ID:", categoryId); // Log the selected category
    setSelectedCategory(categoryId);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
  </div>;
  }

  if (error) {
    return <div>Error loading movies: {error.message}</div>;
  }

  if (trending.length === 0) {
    return (
      <div>
        {selectedCategory 
          ? `No movies found for this category (ID: ${selectedCategory})` 
          : "No trending movies found"}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-gray-900 text-white ">
        <h1 className="text-center text-4xl font-bold py-6">Welcome to MovieApp</h1>
        <AutoScrollSection title="Latest Movies" endpoint="movie/now_playing" />
        <AutoScrollSection  title="Latest TV Shows" endpoint="tv/on_the_air" />
      </div>
      <div className="my-8">
        {/* Categories Section */}
        <Categories onCategorySelect={handleCategorySelect} />
      </div>
      <h1 className="text-2xl font-bold mb-4">
        {selectedCategory ? "Filtered Movies" : "Trending Now"}
      </h1>
      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {trending.map((item) => (
          <Card key={item.id} item={item} /> // Use the Card component here
        ))}
      </div>
    </div>

  );
};

export default Home;
