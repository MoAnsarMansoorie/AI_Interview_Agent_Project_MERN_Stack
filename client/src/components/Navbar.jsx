import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";

const Navbar = ({ handleLogout, isLoggingOut }) => {
  const userData = useSelector((state) => state.user.userData);
  const [showDropdown, setShowDropdown] = useState(false);
  console.log("📊 User Data:", userData);

  const handleLogoutClick = async () => {
    setShowDropdown(false);
    await handleLogout();
  };

  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: "easeInOut" }}
         className='w-full max-w-6xl bg-white rounded-lg shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative'>
          <div className='flex items-center gap-3 cursor-pointer'>
            <div className='bg-black text-white p-2 rounded-lg'>
              <BsRobot size={18} />
            </div>
            <h1 className='font-semibold hidden md:block text-lg'>InterviewIQ.AI</h1>
          </div>

          <div className='flex items-center gap-6 relative'>
            <div className='relative'>
              <button className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition'>
                <BsCoin size={18} />
                <span>{userData ? userData.credits : 0}</span>
              </button>
            </div>
            
            {userData && (
              <div className='relative'>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className='flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-md hover:bg-blue-200 transition'
                >
                  <FaUserAstronaut size={18} />
                  <span className='hidden sm:inline text-sm font-medium'>
                    {userData.name?.split(' ')[0] || 'User'}
                  </span>
                </button>

                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'
                  >
                    <div className='p-4 border-b border-gray-200'>
                      <p className='text-sm font-semibold text-gray-800'>{userData.name}</p>
                      <p className='text-xs text-gray-500'>{userData.email}</p>
                    </div>
                    <button
                      onClick={handleLogoutClick}
                      disabled={isLoggingOut}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition text-sm font-medium ${isLoggingOut ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <HiOutlineLogout size={18} />
                      {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>

        </motion.div>
      
    </div>
  )
}

export default Navbar
