import React, { useState, useEffect } from 'react';
import { Search, MapPin, Check } from 'lucide-react';
import './App.css';

// Assuming you've imported your JSON data
import countriesData from './data/countries.json';

const CountrySearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredCountries = countriesData.filter(country =>
        (country.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSuggestions(filteredCountries.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCountry(null);
  };

  const handleSuggestionClick = (country) => {
    setSearchTerm(country.country || '');
    setSelectedCountry(country);
    setSuggestions([]); // Clear suggestions on selection
  };

  return (
    <div className="fixed top-0 left-0 right-0 p-4 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg z-50">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full px-4 py-2 text-lg text-gray-800 bg-white border-2 border-transparent rounded-full shadow-md focus:outline-none focus:border-yellow-400 transition duration-300 ease-in-out"
            placeholder="Search countries by name or capital..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        {suggestions.length > 0 && (
          <ul className="mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-72 overflow-y-auto">
            {suggestions.map((country, index) => (
              <li
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition duration-200 ease-in-out flex items-center justify-between"
                onClick={() => handleSuggestionClick(country)}
              >
                <div>
                  <div className="font-semibold text-lg text-gray-800">{country.country}</div>
                  <div className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" /> {country.capital}
                  </div>
                </div>
                {selectedCountry?.country === country.country && (
                  <Check className="w-6 h-6 text-green-500" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedCountry && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md text-center">
          <p className="text-xl font-bold text-blue-600">{selectedCountry.country}</p>
          <p className="text-md text-gray-700">Capital: {selectedCountry.capital}</p>
        </div>
      )}
    </div>
  );
};

export default CountrySearchBar;
