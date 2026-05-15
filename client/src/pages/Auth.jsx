import React, { useState } from 'react'
import { FaRobot } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase.js';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';

const Auth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleGoogleAuth = async () => {
    console.log("🚀 Starting Google authentication...");
    setError(null);
    setLoading(true);
    try {
      console.log("🔄 Opening Google sign-in popup...");
      await signInWithPopup(auth, provider);
      console.log("✅ Google sign-in popup opened");
    } catch (error) {
      console.error("❌ Google Auth Error:", error.message);
      setError(error.message || "Authentication failed. Please try again.");
      dispatch(setUserData(null));
    } finally {
      setLoading(false);
    }
  };

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

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'
          >
            <p className='text-red-600 text-sm font-medium'>⚠️ {error}</p>
          </motion.div>
        )}

        <motion.button 
          onClick={handleGoogleAuth}
          disabled={loading}
          whileHover={!loading ? {opacity:0.9, scale: 1.03} : {}}
          whileTap={!loading ? {opacity:1, scale:0.98} : {}}
        className='w-full flex items-center justify-center bg-black text-white gap-3 border border-gray-300 rounded-full shadow-md py-3 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed'
        >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className='w-5 h-5 border-2 border-white border-t-transparent rounded-full'
                />
                Signing in...
              </>
            ) : (
              <>
                <FcGoogle size={20} />
                Sign in with Google
              </>
            )}
        </motion.button>

      </motion.div>


    </div>
  )
}

export default Auth
