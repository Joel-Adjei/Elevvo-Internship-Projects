import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import axios from 'axios';

const CitySearchInput = ({ onCitySelect, onLocationClick, className = "" }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef(null);
  const suggestionRefs = useRef([]);
  const debounceRef = useRef(null);

  const API_KEY = "cc2dc68acemsha2fa87ff8e7527ap19e360jsnf2883c3f0d99";
  const BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";

  const fetchCities = async (searchQuery) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        },
        params: {
          namePrefix: searchQuery,
          limit: 8,
          sort: 'population',
          types: 'CITY'
        }
      });

      const cities = response.data.data.map(city => ({
        id: city.id,
        name: city.name,
        country: city.country,
        region: city.region,
        latitude: city.latitude,
        longitude: city.longitude,
        displayName: `${city.name}, ${city.region ? city.region + ', ' : ''}${city.country}`
      }));

      setSuggestions(cities);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceFetch = (searchQuery) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      fetchCities(searchQuery);
    }, 300);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debounceFetch(value);
  };

  const handleCitySelect = (city) => {
    setQuery(city.displayName);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
    onCitySelect(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleCitySelect(suggestions[selectedIndex]);
    } else if (query.trim()) {
      onCitySelect({ name: query.trim(), displayName: query.trim() });
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleCitySelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedIndex]);

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex-grow flex">
        <div className="relative flex-grow">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            placeholder="Search for a city..."
            className="w-full p-3 text-white bg-transparent border border-white/30 rounded-l-xl focus:ring-1 focus:ring-sky-300 focus:border-sky-300 outline-none placeholder-sky-200 transition-all"
            autoComplete="off"
          />
          
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-sky-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-sky-500 hover:bg-sky-600 text-white outline-none p-3 rounded-r-xl transition-colors flex items-center justify-center"
          aria-label="Search"
        >
          <Search className="w-6 h-6" />
        </motion.button>
      </form>

      <motion.button
        onClick={onLocationClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 outline-none rounded-xl transition-colors flex items-center justify-center space-x-2 w-full md:w-auto ml-0 md:ml-4"
        aria-label="Get weather for current location"
      >
        <MapPin className="w-5 h-5" />
        <span className="font-semibold hidden sm:inline">My Location</span>
      </motion.button>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 md:right-auto md:w-full z-[500] mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto">
              {suggestions.map((city, index) => (
                <motion.div
                  key={city.id}
                  ref={(el) => (suggestionRefs.current[index] = el)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCitySelect(city)}
                  className={`flex items-center space-x-3 p-3 cursor-pointer transition-colors ${
                    selectedIndex === index
                      ? 'bg-sky-100 text-sky-900'
                      : 'text-gray-700 hover:bg-sky-50'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <div className="flex-grow min-w-0">
                    <p className="font-medium truncate">{city.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {city.region && `${city.region}, `}{city.country}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CitySearchInput;