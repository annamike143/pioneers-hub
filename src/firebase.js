// --- firebase.js - This file connects our app to the Firebase backend ---

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics"; // <-- Add this line

const firebaseConfig = {
  apiKey: "AIzaSyDXAZoTDlEtkeoQ9HwqR4-xFsLZUt3E-ks",
  authDomain: "smartbot-status-dashboard.firebaseapp.com",
  databaseURL: "https://smartbot-status-dashboard-default-rtdb.firebaseio.com",
  projectId: "smartbot-status-dashboard",
  storageBucket: "smartbot-status-dashboard.firebasestorage.app",
  messagingSenderId: "962499826914",
  appId: "1:962499826914:web:2a3e66c7fd20dac4283abb",
  measurementId: "G-DSDQLN7YJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the database service
export const database = getDatabase(app);