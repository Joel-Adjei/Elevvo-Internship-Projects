import React, { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence} from 'framer-motion';
import { Droplet, RefreshCw, Thermometer, Wind } from "lucide-react";
import { filterDailyForecast } from "./util/util";
import LoadingState from "./components/LoadingState"
import ErrorMessage from "./components/ErrorMessage"
import CurrentWeatherCard from "./components/CurrentWeatherCard"
import DetailItem from "./components/DetailItem"
import ForecastDayCard from "./components/ForecastDayCard"
import GlassCard from "./components/ui/GlassCard"
import CitySearchInput from "./components/CitySearchInput"

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");

  const API_KEY = "29adf92449bf1424faa950f129ddfbf8";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/";

  const unitSymbol = useMemo(() => (unit === "metric" ? "°C" : "°F"), [unit]);
  const feelsLikeSymbol = useMemo(
    () => (unit === "metric" ? "°C" : "°F"),
    [unit]
  );
  const speedUnit = useMemo(() => (unit === "metric" ? "m/s" : "mph"), [unit]);

  // Main function to fetch weather data (by city name or coordinates)
  const getWeatherData = useCallback(
    async (queryType, queryValue) => {
      setLoading(true);
      setError(null);

      const baseParams = { appid: API_KEY, units: unit };
      let currentUrl = `${BASE_URL}weather?`;
      let forecastUrl = `${BASE_URL}forecast?`;

      if (queryType === "city") {
        currentUrl += `q=${queryValue}&`;
        forecastUrl += `q=${queryValue}&`;
      } else if (queryType === "coords") {
        currentUrl += `lat=${queryValue.lat}&lon=${queryValue.lon}&`;
        forecastUrl += `lat=${queryValue.lat}&lon=${queryValue.lon}&`;
      }

      try {
        const [currentResponse, forecastResponse] = await Promise.all([
          axios.get(currentUrl, { params: baseParams }),
          axios.get(forecastUrl, { params: baseParams }),
        ]);

        // Current Weather
        setCurrentWeather({
          temp: Math.round(currentResponse.data.main.temp),
          feelsLike: Math.round(currentResponse.data.main.feels_like),
          humidity: currentResponse.data.main.humidity,
          windSpeed: currentResponse.data.wind.speed,
          description: currentResponse.data.weather[0].description,
          icon: currentResponse.data.weather[0].icon,
          city: currentResponse.data.name,
          country: currentResponse.data.sys.country,
        });

        // 3-Day Forecast
        const dailyForecast = filterDailyForecast(
          forecastResponse.data.list,
          unit
        );
        setForecast(dailyForecast);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(
            `City "${queryValue}" not found. Please check the spelling.`
          );
        } else {
          console.error("API Fetch Error:", err);
          setError("An unexpected error occurred while fetching data.");
        }
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    },
    [unit]
  );

  const handleLocation = useCallback((isInitialLoad = false) => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData("coords", { lat: latitude, lon: longitude });
        },
        (err) => {
          console.error("Geolocation Error:", err);

          if (isInitialLoad) {
            getWeatherData("city", "London");
          } else {
            setError(
              "Location access denied or failed. Please search for a city instead."
            );
            setLoading(false);
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, [getWeatherData]);


  const handleCitySelect = useCallback((city) => {
    if (city.latitude && city.longitude) {
      getWeatherData("coords", { lat: city.latitude, lon: city.longitude });
    } else {
      getWeatherData("city", city.name);
    }
  }, [getWeatherData]);

  useEffect(() => {
    if (navigator.geolocation) {
      handleLocation(true);
    } else {
      getWeatherData("city", "London");
    }
  }, [getWeatherData, handleLocation]);

  return (
    <>
      <div className="min-h-screen p-4 md:p-10 flex items-start justify-center font-sans bg-gradient-to-br from-sky-700 to-indigo-800">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 text-center">
          Modern Weather Dashboard
        </h1>

        {/* Search Bar & Location Buttons */}
        <div className="sticky top-1 mb-8 p-3 z-50 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <CitySearchInput 
            onCitySelect={handleCitySelect}
            onLocationClick={() => handleLocation(false)}
            className="flex-grow flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4"
          />
        </div>

        {/* Main Content Area (Loading/Error/Data) */}
        <AnimatePresence mode="wait">
          {loading && (
            <div key="loading-state" className="flex justify-center mt-16">
              <LoadingState />
            </div>
          )}

          {!loading && error && (
            <div key="error-state" className="flex justify-center mt-16">
              <ErrorMessage message={error} onClear={() => setError(null)} />
            </div>
          )}

          {!loading && !error && currentWeather && (
            <motion.div
              key="data-dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="z-0 grid grid-cols-1 lg:grid-cols-4 gap-6"
            >
            
              <div className="lg:col-span-2">
                 <CurrentWeatherCard setUnit={setUnit} unit={unit} unitSymbol={unitSymbol} data={currentWeather} />
              </div>

          
              <GlassCard
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 grid grid-cols-2 gap-4 lg:gap-6"
              >
                <h2 className="col-span-2 text-2xl font-bold text-white mb-2">Details</h2>
                
                <DetailItem
                  Icon={Thermometer}
                  label="Feels Like"
                  value={currentWeather.feelsLike}
                  unit={feelsLikeSymbol}
                  delay={0.2}
                />
                <DetailItem
                  Icon={Droplet}
                  label="Humidity"
                  value={currentWeather.humidity}
                  unit="%"
                  delay={0.3}
                />
                <DetailItem
                  Icon={Wind}
                  label="Wind Speed"
                  value={currentWeather.windSpeed}
                  unit={speedUnit}
                  delay={0.4}
                />
                 
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => getWeatherData('city', currentWeather.city)} // Refresh current city
                  className="flex items-center justify-start space-x-3 p-4 bg-white/5 rounded-xl transition-all col-span-2 md:col-span-1"
                  aria-label="Refresh Data"
                >
                  <RefreshCw className="w-6 h-6 text-emerald-300" />
                  <div>
                    <p className="text-xs font-medium text-sky-200 uppercase">Last Updated</p>
                    <p className="text-xl font-bold text-white">Refresh Now</p>
                  </div>
                </motion.button>
              </GlassCard>

              {/* 3-Day Forecast */}
              <GlassCard
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-4"
              >
                <h2 className="text-2xl font-bold text-white mb-4">3-Day Forecast</h2>
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  {forecast.map((item, index) => (
                    <ForecastDayCard key={item.dt} item={item} index={index} />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
    </>
  );
}

export default App;
