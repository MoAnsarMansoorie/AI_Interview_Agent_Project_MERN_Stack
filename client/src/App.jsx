
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import Auth from './pages/Auth'
import { useEffect } from 'react'
import axios from 'axios'

export const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000"

function App() {

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/v1/user/current-user`, {
          withCredentials: true, // Include cookies in the request
        });
        console.log(`Current user data:`, response.data)
        
      } catch (error) {
        console.log(`Error in fetching current user`, error)
      }
    }
    getCurrentUser()
  },[])

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      
    </div>
  )
}

export default App
