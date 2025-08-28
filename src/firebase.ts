// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3PS7WQKqDbnQ5wRABdpRQP_QjKKq7IeY",
  authDomain: "waterjet-dbe65.firebaseapp.com",
  projectId: "waterjet-dbe65",
  storageBucket: "waterjet-dbe65.firebasestorage.app",
  messagingSenderId: "855739547805",
  appId: "1:855739547805:web:6bf91341452feb169b9474",
  measurementId: "G-4L3LTG68C5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
