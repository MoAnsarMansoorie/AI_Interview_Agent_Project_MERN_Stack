
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import Home from "./pages/Home"
import Auth from './pages/Auth'
import LoadingSpinner from './components/LoadingSpinner'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData, clearUserData, setLoading, setError } from './redux/userSlice'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './utils/firebase.js';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userData } = useSelector((state) => state.user);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const logoutInProgressRef = useRef(false);

  const saveToken = (token) => {
    if (token) {
      localStorage.setItem("authToken", token);
    }
  };

  const clearToken = () => {
    localStorage.removeItem("authToken");
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleLogout = async () => {
    if (logoutInProgressRef.current) {
      return;
    }

    logoutInProgressRef.current = true;
    setIsLoggingOut(true);
    console.log("🚪 Logging out...");

    // Immediately clear auth state so the UI responds right away.
    clearToken();
    dispatch(clearUserData());
    navigate('/auth');

    try {
      // Call backend logout endpoint
      await axios.get("/api/v1/auth/logout", {
        withCredentials: true,
      });
      console.log("✅ Backend logout successful");
    } catch (error) {
      console.error("❌ Backend logout error:", error);
    }

    try {
      // Sign out from Firebase
      await signOut(auth);
      console.log("✅ Firebase logout successful");
    } catch (error) {
      console.error("❌ Firebase logout error:", error);
    }

    logoutInProgressRef.current = false;
    setIsLoggingOut(false);
    console.log("✅ User logged out completely");
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log("🔍 Fetching current user...");
      try {
        const response = await axios.get("/api/v1/user/current-user", {
          headers: getAuthHeaders(),
          withCredentials: true,
        });
        console.log("✅ Current user data:", response.data);
        if (response.data?.user) {
          dispatch(setUserData(response.data.user));
        } else {
          dispatch(setUserData(null));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          console.log(`❌ No active session; current-user is protected.`);
          dispatch(setUserData(null));
          return;
        }
        console.log(`❌ Error in fetching current user`, error);
        dispatch(setError(error.message));
        dispatch(setUserData(null));
      }
    };

    console.log("🔄 Listening for Firebase auth state changes...");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (logoutInProgressRef.current) {
        console.log("⏳ Logout in progress, skipping auth refresh.");
        return;
      }

      if (user) {
        console.log("✅ Firebase user signed in:", user.email);
        const name = user.displayName;
        const email = user.email;

        console.log("📤 Sending auth data to backend:", { name, email });
        dispatch(setLoading(true));
        try {
          const response = await axios.post("/api/v1/auth/google", { name, email }, {
            withCredentials: true,
          });
          console.log("✅ Backend auth response:", response.data);
          saveToken(response.data.token);
          dispatch(setUserData(response.data.user));
          dispatch(setLoading(false));
          // Redirect to home page after successful authentication
          navigate('/');
        } catch (error) {
          console.error("❌ Backend auth error:", error);
          dispatch(setError(error.message));
          dispatch(setLoading(false));
          dispatch(setUserData(null));
        }
      } else {
        console.log("ℹ️ No Firebase user session");
        dispatch(setUserData(null));
      }

      await fetchCurrentUser();
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div>
      {loading && <LoadingSpinner />}
      <Routes>
        {/* If user is authenticated, show Home page, otherwise redirect to Auth */}
        <Route
          path="/"
          element={
            userData ? (
              <Home handleLogout={handleLogout} isLoggingOut={isLoggingOut} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        {/* If user is authenticated, redirect to Home, otherwise show Auth page */}
        <Route
          path="/auth"
          element={
            userData ? (
              <Navigate to="/" replace />
            ) : (
              <Auth />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
