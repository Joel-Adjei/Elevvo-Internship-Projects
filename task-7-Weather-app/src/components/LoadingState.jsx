import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const LoadingState = () => (
    <GlassCard
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-12 text-white"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-10 h-10 text-sky-200" />
      </motion.div>
      <p className="mt-4 text-lg font-medium">Fetching weather data...</p>
    </GlassCard>
);

export default LoadingState;