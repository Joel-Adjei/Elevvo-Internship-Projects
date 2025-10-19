import React from 'react';
import { motion } from 'framer-motion';
import { getWeatherIcon } from '../util/util';

const ForecastDayCard = ({ item, index , unitSymbol}) => {
    const Icon = getWeatherIcon(item.icon);
    const day = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)" }}
        className="text-center p-4 bg-white/10 rounded-xl shadow-lg border border-white/20 transition-all cursor-pointer"
      >
        <p className="font-semibold text-white">{day}</p>
        <Icon className="w-8 h-8 mx-auto my-2 text-sky-200" />
        <p className="text-xl font-bold text-white">
          {item.temp}{unitSymbol}
        </p>
        <p className="text-xs font-light capitalize text-sky-200 mt-1">{item.description}</p>
      </motion.div>
    );
  };

  export default ForecastDayCard;