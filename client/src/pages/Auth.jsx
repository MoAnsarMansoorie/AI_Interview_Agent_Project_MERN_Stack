import React from 'react'
import { FaRobot } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-[#f3f3f3] px-6 py-20'>
      <motion.div 
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, ease: "easeInOut" }}
      className='w-full max-w-md shadow-2xl bg-white p-8 rounded-3xl border border-gray-300'>
        <div className='flex items-center justify-center gap-3 mb-6'>
            <div className='bg-black text-white p-2 rounded-lg'>
                <FaRobot size={18} />
            </div>
            <h2 className='font-semibold text-lg'>AI-Interview Agent</h2>
        </div>

        <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
            Continue with 
            <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                <IoSparkles size={16} />
                AI Smart Interview
            </span>
        </h1>

        <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
            SignIn to start AI-powered Mock Interview,
            track your progress, and unlock details performance insights.
        </p>

        <motion.button 
          whileHover={{opacity:0.9, scale: 1.03}}
          whileTap={{opacity:1, scale:0.98}}
        className='w-full flex items-center justify-center bg-black text-white gap-3 border border-gray-300 rounded-full shadow-md py-3 text-sm font-medium'>
            <FcGoogle size={20} />
            Sign in with Google
        </motion.button>

      </motion.div>


    </div>
  )
}

export default Auth
