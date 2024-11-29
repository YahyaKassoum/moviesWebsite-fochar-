import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTranslate from "../service/translation";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setIsMobileMenuOpen(false); // Close mobile menu after search
    }
  };

  const NavLinks = () => (
    <>
      <li className="py-2 md:py-0">
        <button 
          onClick={() => {
            navigate("/");
            setIsMobileMenuOpen(false);
          }} 
          className="text-white hover:text-blue-300 transition-colors duration-200 w-full text-left md:text-center"
        >
          Home
        </button>
      </li>
      <li className="py-2 md:py-0">
        <button 
          onClick={() => {
            navigate("/Movies");
            setIsMobileMenuOpen(false);
          }} 
          className="text-white hover:text-blue-300 transition-colors duration-200 w-full text-left md:text-center"
        >
          Movies
        </button>
      </li>
      <li className="py-2 md:py-0">
        <button 
          onClick={() => {
            navigate("/TVShows");
            setIsMobileMenuOpen(false);
          }} 
          className="text-white hover:text-blue-300 transition-colors duration-200 w-full text-left md:text-center"
        >
          TV Shows
        </button>
      </li>
      <li className="py-2 md:py-0">
        <button 
          onClick={() => {
            navigate("/Anime");
            setIsMobileMenuOpen(false);
          }} 
          className="text-white hover:text-blue-300 transition-colors duration-200 w-full text-left md:text-center"
        >
          Anime
        </button>
      </li>
      <li className="md:hidden py-2">
        <CustomTranslate />
      </li>
    </>
  );

  return (
    <header className="bg-gray-800 p-4 relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white flex-shrink-0">MovieApp</div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-4 items-center">
            <NavLinks />
            <li className="ml-4">
              <CustomTranslate />
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center ml-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Search
          </button>
        </form>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-800 md:hidden">
            <div className="px-4 pt-2 pb-4">
              {/* Mobile Navigation */}
              <ul className="space-y-2">
                <NavLinks />
              </ul>

              {/* Mobile Search Bar */}
              <form onSubmit={handleSearchSubmit} className="mt-4 flex">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="flex-grow p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;