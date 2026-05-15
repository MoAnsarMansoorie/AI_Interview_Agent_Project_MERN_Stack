import React from 'react'
import Navbar from '../components/Navbar'

const Home = ({ handleLogout, isLoggingOut }) => {
  return (
    <div className='min-h-screen bg-[#f3f3f3] flex flex-col'>
      <Navbar handleLogout={handleLogout} isLoggingOut={isLoggingOut} />
    </div>
  )
}

export default Home
