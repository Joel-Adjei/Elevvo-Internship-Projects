import {
  Sun,
  SunMedium,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Wind,
} from "lucide-react";

export const getWeatherIcon = (iconCode) => {
  if (!iconCode) return Sun;

  // Simple mapping based on icon codes
  switch (iconCode.slice(0, 2)) {
    case "01": // clear sky
      return Sun;
    case "02": // few clouds
    case "03": // scattered clouds
    case "04": // broken clouds
      return Cloud;
    case "09": // shower rain
    case "10": // rain
      return CloudRain;
    case "11": // thunderstorm
      return CloudLightning;
    case "13": // snow
      return CloudSnow;
    case "50": // mist
      return Wind;
    default:
      return SunMedium; // Default fallback
  }
};

export const filterDailyForecast = (list, unit) => {
  const dailyData = {};
  const today = new Date().toDateString();

  for (const item of list) {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toDateString();

    // Skip today's data
    if (dateStr === today) continue;

    // We only want 3 unique days
    if (Object.keys(dailyData).length >= 3) continue;

    const hour = date.getHours();

    // Try to grab the data closest to 12 PM for the best representation of the day
    if (
      !dailyData[dateStr] ||
      Math.abs(hour - 12) <
        Math.abs(new Date(dailyData[dateStr].dt * 1000).getHours() - 12)
    ) {
      dailyData[dateStr] = {
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        dt: item.dt,
      };
    }
  }

  // Convert to array, sort by date, and return the first 3
  return Object.values(dailyData)
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 3);
};
