import React from 'react'
import { motion } from "motion/react"

const LoadingSpinner = () => {
  return (
    <div className='fixed inset-0 bg-black/30 flex justify-center items-center z-50'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='bg-white rounded-lg shadow-2xl p-8'
      >
        <div className='flex flex-col items-center gap-4'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className='w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full'
          />
          <p className='text-gray-600 font-medium'>Processing...</p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoadingSpinner
