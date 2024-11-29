import React, { useEffect, useState } from "react";

const API_KEY = "2f9537d318f02eea8d56cd7e3c7bb321"; // Your TMDB API Key
const BASE_URL = "https://api.themoviedb.org/3";

const Categories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        setCategories(data.genres || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center">Loading categories...</div>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Categories</h2>
      <div className="flex text-center justify-center items-center flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 focus:bg-gray-600 text-white"
            onClick={() => onCategorySelect(category.id)} // Pass category id to parent
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
