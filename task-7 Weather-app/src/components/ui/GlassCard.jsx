import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', ...props }) => (
    <motion.div
      className={`bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
);

export default GlassCard;