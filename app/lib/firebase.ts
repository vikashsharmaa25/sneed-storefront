import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOntXfcjn3ypNCHdURn7j67BsEIsf32QM",
  authDomain: "sneed-storefront.firebaseapp.com",
  projectId: "sneed-storefront",
  storageBucket: "sneed-storefront.firebasestorage.app",
  messagingSenderId: "1077572213734",
  appId: "1:1077572213734:web:b54c766352cc319fd65427"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
