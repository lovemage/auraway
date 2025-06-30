// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 新增這行以包含 Auth

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdsPNq6ZFmRgKJP0xsbunCv5bzuFEaAyo",
  authDomain: "aurawayshop-e69e0.firebaseapp.com",
  projectId: "aurawayshop-e69e0",
  storageBucket: "aurawayshop-e69e0.firebasestorage.app",
  messagingSenderId: "73632425622",
  appId: "1:73632425622:web:fdab02abeacc338e3fc4b7",
  measurementId: "G-D3PKC71HQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // 初始化 Auth

export { auth, analytics }; // 匯出 auth 和 analytics
