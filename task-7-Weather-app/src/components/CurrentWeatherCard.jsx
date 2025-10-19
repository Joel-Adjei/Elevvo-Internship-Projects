import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import { getWeatherIcon } from '../util/util';

const CurrentWeatherCard = ({ data , setUnit, unit , unitSymbol}) => {
    const Icon = getWeatherIcon(data.icon);
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    return (
      <GlassCard
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center p-6 md:p-10 col-span-1 md:col-span-2 lg:col-span-3 min-h-[300px] lg:min-h-[400px]"
      >
        <motion.div
            key={data.icon}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-white mb-4"
        >
          <Icon className="w-24 h-24 md:w-32 md:h-32 text-sky-200" />
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          {data.temp}
          <motion.span
            key={unitSymbol}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sky-300 ml-1 font-light"
          >
            {unitSymbol}
          </motion.span>
        </h1>
        
        <p className="text-xl md:text-3xl font-light text-white mt-1">
          {data.city}, {data.country}
        </p>
        <p className="text-sm md:text-base text-sky-200 mt-1">{date}</p>
        <p className="text-lg md:text-xl font-medium capitalize text-sky-100 mt-2">{data.description}</p>
        
        <div className="flex items-center space-x-2 mt-4 text-sm font-semibold text-white">
          <button
            onClick={() => setUnit('metric')}
            className={`p-2 rounded-full transition-all ${unit === 'metric' ? 'bg-white/30' : 'bg-transparent hover:bg-white/10'}`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`p-2 rounded-full transition-all ${unit === 'imperial' ? 'bg-white/30' : 'bg-transparent hover:bg-white/10'}`}
          >
            °F
          </button>
        </div>
        
      </GlassCard>
    );
  };

  export default CurrentWeatherCard;