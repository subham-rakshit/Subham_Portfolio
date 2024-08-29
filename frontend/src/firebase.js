import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "portfolio-jitu97.firebaseapp.com",
  projectId: "portfolio-jitu97",
  storageBucket: "portfolio-jitu97.appspot.com",
  messagingSenderId: "977846030114",
  appId: "1:977846030114:web:642bc46c35aff0e1f0df7b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
