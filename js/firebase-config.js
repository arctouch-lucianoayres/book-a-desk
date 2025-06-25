// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXca25jNSCZ0TsVQOCqvmbQqgdiElvORg",
  authDomain: "spaces-5989c.firebaseapp.com",
  databaseURL: "https://spaces-5989c-default-rtdb.firebaseio.com",
  projectId: "spaces-5989c",
  storageBucket: "spaces-5989c.firebasestorage.app",
  messagingSenderId: "424979887764",
  appId: "1:424979887764:web:f9316fe5d3920b5d9c6681",
  measurementId: "G-BN5T9CYKMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };