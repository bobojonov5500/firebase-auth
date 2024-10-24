import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCCHGsP312yrIJJq-skABUWeby9oaxhEP0",
  authDomain: "fir-2-a8009.firebaseapp.com",
  projectId: "fir-2-a8009",
  storageBucket: "fir-2-a8009.appspot.com",
  messagingSenderId: "886000433859",
  appId: "1:886000433859:web:a4b5c149ddb9f6510f4076",
  measurementId: "G-9WB639TRF0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };
