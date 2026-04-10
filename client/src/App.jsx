
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import Auth from './pages/Auth'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { clearUserData, setUserData } from './redux/userSlice'

export const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000"
axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/v1/user/current-user`, {
          withCredentials: true, // Include cookies in the request
        });
        // console.log(`Current user data:`, response.data)
        dispatch(setUserData(response.data))
      } catch (error) {
        if (error.response?.status === 401) {
          console.log(`No active session; current-user is protected.`)
          dispatch(clearUserData())
          return
        }
        console.log(`Error in fetching current user`, error)
        dispatch(clearUserData())
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
