import React from 'react';
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const ErrorMessage = ({ message, onClear }) => (
    <GlassCard
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center p-8 text-white text-center"
    >
      <AlertTriangle className="w-12 h-12 text-red-400" />
      <h2 className="mt-4 text-xl font-bold">Oops! Weather Data Not Found</h2>
      <p className="mt-2 text-sm">{message}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        className="mt-5 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-full font-semibold transition-colors"
      >
        Try a Different City
      </motion.button>
    </GlassCard>
  );

  export default ErrorMessage;