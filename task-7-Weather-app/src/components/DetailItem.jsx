
import { motion } from 'framer-motion';

const DetailItem = ({ Icon, label, value, unit, delay }) => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="flex items-center justify-start space-x-3 p-4 bg-white/5 rounded-xl transition-all"
    >
      <Icon className="w-6 h-6 text-sky-300" />
      <div>
        <p className="text-xs font-medium text-sky-200 uppercase">{label}</p>
        <p className="text-xl font-bold text-white">{value}{unit}</p>
      </div>
    </motion.div>
  );

export default DetailItem