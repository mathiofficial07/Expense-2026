import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const floatingVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const AnimatedHero = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 300, md: 450 } }}>
      {/* Main Phone Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 200, height: 400, bgcolor: 'white', borderRadius: '28px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)', p: 1.5 }}>
          <Box sx={{ height: '100%', bgcolor: '#f4f6f8', borderRadius: '20px' }} />
        </Box>
      </motion.div>

      {/* Floating UI Elements */}
      <motion.div variants={floatingVariants} animate="animate" style={{ position: 'absolute', top: '20%', left: '10%' }}>
        <PieChartIcon sx={{ fontSize: 80, color: '#ff7043', filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.2))' }} />
      </motion.div>

      <motion.div variants={floatingVariants} animate="animate" style={{ position: 'absolute', top: '35%', right: '5%' }}>
        <BarChartIcon sx={{ fontSize: 90, color: '#ffca28', filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.2))' }} />
      </motion.div>

      <motion.div variants={floatingVariants} animate="animate" style={{ position: 'absolute', bottom: '20%', left: '20%' }}>
        <MonetizationOnIcon sx={{ fontSize: 70, color: '#66bb6a', filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.2))' }} />
      </motion.div>
    </Box>
  );
};

export default AnimatedHero;
