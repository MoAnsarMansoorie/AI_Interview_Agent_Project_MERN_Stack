
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import Auth from './pages/Auth'

export const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000"

function App() {

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
