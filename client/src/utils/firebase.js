

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-interview-agent-9876b.firebaseapp.com",
  projectId: "ai-interview-agent-9876b",
  storageBucket: "ai-interview-agent-9876b.firebasestorage.app",
  messagingSenderId: "525090435501",
  appId: "1:525090435501:web:dbe2a377e2568563187124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };